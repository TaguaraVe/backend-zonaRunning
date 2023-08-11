import mongoose, {Schema, Document} from 'mongoose';

export interface IAppointment extends Document{
    
    id_client:string,
    id_service:string,
    id_professional:string,
    date:string,
    hour:string,
    comentarios:string
}

const AppointmentSchema:Schema = new Schema({
    id_client : {type:String, require:true},
    id_service : {type:String, require:true},
    id_professional : {type:String, require:true},
    date : {type:String, require:true},
    hour : {type:String, require:true},
    comentarios : {type:String, require:true}
});

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);