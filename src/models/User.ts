import mongoose, { Schema, Document } from 'mongoose'



export interface IUser extends Document {
    First_name: string,
    Last_name: string,
    Email: string,
    Password: string,
    habilitado: boolean,    
    role: string,
    avatar:Schema.Types.ObjectId
};

const UserSchema:Schema = new Schema({
    First_name:{type:String, required:true},
    Last_name:{type: String, required: true},
    Email:{type: String, required: true, unique:true},
    Password:{type: String, required: true},
    habilitado:{type: Boolean, default: false},
    role:{type:String, require:true},
    avatar:{type:Schema.Types.ObjectId, ref:'Avatar'}
},
{
    timestamps:true
});


UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.Password;

    return userObject;
}



export default mongoose.model<IUser>('User', UserSchema);