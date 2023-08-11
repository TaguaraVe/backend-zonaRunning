import { Schema, model, Document } from 'mongoose';

interface IClient extends Document {
  edad: string;
  peso: number;
  estatura: string;
  user: Schema.Types.ObjectId
}

const clientSchema = new Schema<IClient>({
  edad: { type: String, required: true },
  peso: { type: Number, required: true },
  estatura: { type: String, required: true },
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true }

});

const ClientModel = model<IClient>('Client', clientSchema);

export default ClientModel;