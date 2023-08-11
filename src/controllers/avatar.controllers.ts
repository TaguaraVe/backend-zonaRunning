import Avatar from '../models/Avatar';
import { catchError } from '../utils/catchError';
import { Request, Response } from 'express'
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary';

export const getAll = catchError(async (_req: Request, res: Response) => {

    const avatar = await Avatar.find();

    res.json(avatar)

})


export const create = catchError(async (req: Request, res: Response) => {

    if (req.file) {

        if (req.file.filename) {
            const { path, filename } = req.file;
            const images = await uploadToCloudinary(
                path, filename
            )

            if (images) {
                const { url, public_id } = images;

                const body = { url, filename: public_id };

                const image = new Avatar(body);
                await image.save();

                res.status(201).json(image)
            }

        } else {
            res.status(404)
        }

    }


})

export const remove = catchError(async (req: Request, res: Response) => {
    const { id } = req.params;

    const image = await Avatar.findById({ _id: id })

    if (image) {
        await deleteFromCloudinary(image.filename)

        await image.deleteOne();

        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }


})