import mongoose, {Schema, Document} from 'mongoose';

export interface IAvatar extends Document{
    url:string,
    filename:string,
}

const AvatarSchema = new Schema({
    url: String,
    filename:String,
})

export default mongoose.model<IAvatar>('Avatar', AvatarSchema)