import { Schema, model, Document, Types } from "mongoose";

type Priority = "Low" | "Medium" | "High";

interface ITask extends Document {
  title: string;
  description?: string;
  column: Types.ObjectId; 
  assignedTo?: Types.ObjectId;
  priority: Priority;
  position: number;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  column: { 
    type: Schema.Types.ObjectId, 
    ref: "Column", 
    required: true  // Enforces relationship
  },
  assignedTo: { 
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  position: { type: Number, required: true }
});

export default model<ITask>("Task", TaskSchema);