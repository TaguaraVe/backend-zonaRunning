import { Schema, model, Document } from 'mongoose';

interface IProfession extends Document {
  especialidad: string;
  rating: number;
  titulo: string;
  descripcion: string;
  user: Schema.Types.ObjectId;
  source:string;
  duracion: string;
  precio:number;
  disponibilidad: Schema.Types.ObjectId;
}

const professionSchema = new Schema<IProfession>({
  especialidad: { type: String, required: true },
  rating: { type: Number, required: true },
  titulo:{type: String, required: true},
  descripcion: { type: String, required: true },
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true },
  source: {type: String, required: true},
  duracion:{type: String, required: true},
  disponibilidad: {type: Schema.Types.ObjectId, ref:'Disponibilidad'}
});

const ProfessionModel = model<IProfession>('Profession', professionSchema);

export default ProfessionModel;
