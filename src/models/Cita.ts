import { Schema, model, Document } from 'mongoose';

interface ICita extends Document {
  date: Date;
  hour: string;
  comments: string;
  client: Schema.Types.ObjectId;
  professional: Schema.Types.ObjectId;
}

const citaSchema = new Schema<ICita>({
  date: { type: Date, required: true },
  hour: { type: String, required: true },
  comments: { type: String },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  professional: { type: Schema.Types.ObjectId, ref: 'Profession', required: true }
});

const CitaModel = model<ICita>('Cita', citaSchema);

export default CitaModel;