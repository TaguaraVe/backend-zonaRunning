import mongoose, {Schema, Document} from 'mongoose';

export interface IEmailCode extends Document{
    code:string,
    userId:string
}

const EmailCodeSchema = new Schema({
    code:{type:String, require:true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'users'}
})


export default mongoose.model<IEmailCode>('EmailCode', EmailCodeSchema)
