import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

});

export default mongoose.model<IUser>("User", UserSchema);