import mongoose, { Types } from "mongoose";
import Task from "../models/task";
import Column from "../models/column";
import Board from '../models/board';
import User from "../models/user";
import { ApiError } from "../utils/apiError";

interface CreateTaskParams {
  title: string;
  description?: string;
  columnId: string;
  priority?: "Low" | "Medium" | "High";
  assignedTo?: string;
  userId: Types.ObjectId;
}

export const createTaskService = async ({
  title,
  description,
  columnId,
  priority = "Medium",
  assignedTo,
  userId
}: CreateTaskParams) => {
  // Verify column exists and belongs to user

  const column = await Column.findOne({
    _id: columnId,
  });
  
  if (!column) {
    throw new ApiError(404, "Column not found or access denied");
  }

  // Verify assigned user exists if provided
  let assignedUser = null;
  if (assignedTo) {
    assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      throw new ApiError(404, "Assigned user not found");
    }
  }

  // Get highest position in column
  const highestPositionTask = await Task.findOne({ column: columnId })
    .sort("-position")
    .select("position")
    .lean();

  const position = highestPositionTask ? highestPositionTask.position + 1 : 0;

  const task = await Task.create({
    title,
    description,
    column: columnId,
    position,
    priority,
    assignedTo: assignedUser?._id
  });

  // Add task to column
  column.tasks.push(task._id as mongoose.ObjectId);
  await column.save();

  return task;
};

export const updateTaskService = async (
  taskId: string,
  userId: Types.ObjectId,
  updateData: any
) => {
  const task = await Task.findOne({
    _id: taskId,
  });

  if (!task) {
    throw new ApiError(404, "Task not found or access denied");
  }

  // Handle assignment changes
  if (updateData.assignedTo !== undefined) {
    if (updateData.assignedTo) {
      const user = await User.findById(updateData.assignedTo);
      if (!user) throw new ApiError(404, "User not found");
      task.assignedTo = user._id as mongoose.Types.ObjectId;
    } else {
      task.assignedTo = undefined;
    }
  }

  // Handle priority changes
  if (updateData.priority) {
    task.priority = updateData.priority;
  }

  // Handle position/column changes
  if (updateData.position !== undefined) {
    task.position = updateData.position;
  }

  if (updateData.columnId) {
    const newColumn = await Column.findOne({
      _id: updateData.columnId,
    });

    if (!newColumn) {
      throw new ApiError(404, "New column not found or access denied");
    }

    // Remove from old column
    await Column.findByIdAndUpdate(task.column, {
      $pull: { tasks: task._id }
    });

    // Add to new column
    task.column = newColumn._id as mongoose.Types.ObjectId;
    newColumn.tasks.push(task._id as mongoose.ObjectId);
    await newColumn.save();
  }

  // Update other fields
  if (updateData.title) task.title = updateData.title;
  if (updateData.description !== undefined) {
    task.description = updateData.description;
  }

  await task.save();
  return task;
};

export const deleteTaskService = async (taskId: string, userId: Types.ObjectId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
  });
  if (task == null) {
    throw new ApiError(404, "Task not found or access denied");
  }

  // Remove from column
  await Column.findByIdAndUpdate(task.column, {
    $pull: { tasks: task._id }
  });
};

