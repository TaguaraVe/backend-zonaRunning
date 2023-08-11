import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface CustomRequest extends Request {
    user?: {
        _id?: string;
        First_name?: string;
        Last_name?: string;
        Email?: string;
        Password?: string;
        habilitado?: boolean;
        __v?: number;
    };
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {

    const authHeader: string | string[] | undefined = req.headers.authorization || req.headers.Authorization;

    if (typeof authHeader == 'string') {
        if ( !authHeader.startsWith('Bearer ')) {
            res.sendStatus(401);
        } else {
            let token: string = authHeader.split(' ')[1];

            
            const tokenSecret: string = <string>process.env.TOKEN_SECRET;
         
            jwt.verify(
                token,

                 tokenSecret,

                  (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
                if (err) {

                    res.sendStatus(403);

                } else {
                    if (typeof decoded !== 'string' && decoded != undefined) {

                        req.user = decoded.user as {
                            _id?: string;
                            First_name?: string;
                            Last_name?: string;
                            Email?: string;
                            Password?: string;
                            habilitado?: boolean;
                            __v?: number;
                        };

                    }

                    next()
                }



            });

        }
    }else if(!authHeader){
        res.sendStatus(401);
    }




};

export default verifyJWT;
