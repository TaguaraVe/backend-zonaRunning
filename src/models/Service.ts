import mongoose, {Schema, Document} from 'mongoose';

export interface IService extends Document{
    title:string,
    description:string,
    duration:string,
    price:number,
    status:boolean
}

const ServiceSchema:Schema = new Schema({
    title : {type:String, required:true},
    description : {type:String, required:true},
    duration : {type:String, required:true},
    price : {type:String, required:true},
    status : {type:Boolean, required:true, default:false}
})

export default mongoose.model<IService>('Service',ServiceSchema);
