import { Schema, model, Document, Types } from 'mongoose';

interface IDate {
    dia:string;
    horas: string[];
    _id: Types.ObjectId;
}

interface IDisponibilidad extends Document {
    disponibilidad: IDate[];
    profesional: Schema.Types.ObjectId;
}

const professionSchema = new Schema<IDisponibilidad>({
    
    disponibilidad: [
        {
            dia: {type: String},
            horas: {type: [String]}
        }
    ],
    profesional: {type: Schema.Types.ObjectId, ref:'Profession', required: true}

});

const ProfessionModel = model<IDisponibilidad>('Disponibilidad', professionSchema);

export default ProfessionModel;
