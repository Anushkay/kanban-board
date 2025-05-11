import mongoose, { Document } from "mongoose";

interface IBoard extends Document {
  user: mongoose.Schema.Types.ObjectId;
  columns: mongoose.Schema.Types.ObjectId[];
}

const BoardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Column" }],
});

export default mongoose.model<IBoard>("Board", BoardSchema);