import mongoose, { Document } from "mongoose";

interface IColumn extends Document { 
  title: string;
  tasks: mongoose.Schema.Types.ObjectId[];
}

const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

export default mongoose.model<IColumn>("Column", ColumnSchema);