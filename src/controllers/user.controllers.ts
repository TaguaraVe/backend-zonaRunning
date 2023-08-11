import { Request, Response } from 'express'
import { catchError } from '../utils/catchError'
import { inteLogin, inteUser } from '../utils/utilIntefaces'
import sendEmail from '../utils/sentEmail';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randomCode from '../utils/randomCode'
import User from '../models/User'
import mongoose from 'mongoose'
import EmailCode from '../models/EmailCode';


//GET all-> /users ------------ public EndPoint 
export const getAll = catchError(async (_req: Request, res: Response) => {

    const user = await User.find().populate('avatar')

    res.json(user)

})

//Post -> /users ------------ public EndPoint 
export const create = catchError(async (req: Request, res: Response) => {

    const {
        First_name,
        Last_name,
        Email,
        Password,
        Profession,
        role
    }: inteUser = req.body;

    //const frontBaseUrl:string = req.body.frontBaseUrl;

    const body: inteUser = {
        First_name,
        Last_name,
        Email,
        Password: await bcrypt.hash(Password, 10),
        Profession,
        role
    }

    // const frontBaseUrl: string = req.body.frontBaseUrl;

    const user = new User(body);

    await user.save()

    if (!user) {
        res.sendStatus(404)

    } else {

        // const code: string = randomCode();

        // const url: string = `${frontBaseUrl}/very_email/${code}`;

        // await sendEmail({
        //     to: Email,
        //     subject: 'Verificacion de cuenta',
        //     html: `
        //         <h2>User Creating</h2>
        //         <a href='${url}'>Click me!</a> 
        //     `
        // })

        // const bodyCode: object = { code, userId: user._id }

        // const email = new EmailCode(bodyCode)
        // await email.save();

        res.status(201).json(user);
    }


})


//GET One -> /users/:id ------------ public EndPoint 
export const getOne = catchError(async (req: Request, res: Response) => {

    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ message: 'ID invalid' });
    } else {

        const user = await User.findById(id).populate('avatar');
        res.json(user)

    }



})


//Remove One -> /users/:id ------------ public EndPoint 
export const remove = catchError(async (req: Request, res: Response) => {

    const { id } = req.params


    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ message: "ID invalid" })
    } else {

        const deleteUser = await User.deleteOne({ _id: id });

        if (deleteUser.deletedCount == 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204)
        }

    }



});

//put One -> /users/:id ------------ public EndPoint 
export const update = catchError(async (req: Request, res: Response) => {

    const { id } = req.params;

    const body: inteUser = req.body;

    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ message: "ID invalid" })
    } else {

        if (Object.keys(body).length == 0) {
            res.status(404).json({ message: "Empty body" })
        } else {
            const user = await User.findByIdAndUpdate(
                { _id: id },
                body,
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: "User not found" })
            } else {
                res.json(user)
            }
        }
    }



})

//login post -> /users/login
export const login = catchError(async (req: Request, res: Response) => {

    const { email, password }: inteLogin = req.body;

    const user = await User.findOne({ Email: email })

    if (!user) {
        res.status(401).json({ error: "Envalid Credentials" });
    } else {

        const isValidPassword: boolean = await bcrypt.compare(password, user.Password)

        if (isValidPassword) {

            const token: string = jwt.sign(
                { user },
                <string>process.env.TOKEN_SECRET,
                { expiresIn: '1d' }
            )


            res.status(200).json({ user, token })
        } else {
            res.status(401).json({ error: "Envalid Credentials" });
        }


    }
})

//GET -> /users/verify/:code --- public endpoint
export const verifyCode = catchError(async (req: Request, res: Response) => {

    const { code } = req.params;

    const codeUser = await EmailCode.findOne({ code })

    if (!codeUser) {
        res.sendStatus(401)
    } else {
        const body: object = { habilitado: true }

        const userUpdate = await User.findByIdAndUpdate({ _id: codeUser.userId }, body, { new: true })

        await codeUser.deleteOne()

        res.json(userUpdate)
    }

});

//GET -> /users/me --- public endpoint
interface CustomRequest extends Request {
    user?: object;
}

export const logged = catchError(async (req: CustomRequest, res: Response) => {

    if (req.user) {

        const { _id } = req.user as {
            _id?: string;
            First_name?: string;
            Last_name?: string;
            Email?: string;
            Password?: string;
            habilitado?: boolean;
            __v?: number;
        };

        const user = await User.findById({ _id })
        res.send(user)
    } else {
        res.sendStatus(204)
    }


});


// working with the reset password
//reset_password ---------------- public EndPoint
export const resetPassword = catchError(async (req: Request, res: Response) => {

    interface reqBody {
        email: string;
        frontBaseUrl: string;
    }

    const { email: userEmail, frontBaseUrl }: reqBody = req.body;

    const user = await User.findOne({ Email: userEmail })

    if (user) {
        const code: string = `password ${randomCode()}`

        const url = `${frontBaseUrl}/reset_password/${code}`

        await sendEmail({
            to: userEmail,
            subject: 'solicitud de cambio de contraseña',
            html: `
                <h2>Cambiar contraseña</h2>
                <a href='${url}'>Click me!</a> 
            `
        })

        const bodyCode: object = { code, userId: user._id }

        const email = new EmailCode(bodyCode)
        await email.save();

        res.json(user)

    } else {
        res.sendStatus(401)
    }

})

//Get /users/reset_password/:code ---- public enpoint
export const updatePassword = catchError(async (req: Request, res: Response) => {
    interface bodyParse {
        code?: string;
        password?: string;
    }
    const { code }: bodyParse = req.params;

    const { password }: bodyParse = req.body;

    const userCode = await EmailCode.findOne({ code })

    if (userCode && password) {

        const hashPassword = await bcrypt.hash(password, 10);

        const body = { Password: hashPassword }

        const user = await User.findByIdAndUpdate(
            { _id: userCode.userId },
            body,
            { new: true }
        )

        if (!user) {
            res.status(404).json({ message: "User not found" })
        } else {
            await userCode.deleteOne();
            res.json(user)
        }

    } else {
        res.status(404).json({ message: "User not found" })
    }

})


//Set avatar
export const setAvatar = catchError(async (req:Request, res:Response)=> {

    const {id} = req.params;

    const {avatarId} = req.body;

    const avatar = await User.findByIdAndUpdate(
        {_id:id},
        {avatar:avatarId},
        {new:true}
    );

    if(!avatar) res.status(404).json({message: "User not found"})
    
    if(avatar) res.json(avatar)

})