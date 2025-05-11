import mongoose, { Types } from "mongoose";
import  Board  from "../models/board";
import  Column  from "../models/column";
import Task from "../models/task";


import { ApiError } from "../utils/apiError";

export const getBoardWithColumnsAndTasks = async (userId: Types.ObjectId) => {
  const board = await Board.findOne({ user: userId })
    .populate({
      path: 'columns',
      populate: {
        path: 'tasks',
        model: Task
      }
    });

  if (!board) {
    throw new ApiError(404, "Board not found");
  }
  return board;
};


// It will create the default board when the user registers.
export const createDefaultBoard = async (userId: string) => {
  const board = await Board.create({ 
    title: "My Board", 
    user: userId 
  });

  const defaultColumns = [
    { title: "To Do", position: 0 },
    { title: "In Progress", position: 1 },
    { title: "Done", position: 2 }
  ];

  const columns = await Promise.all(
    defaultColumns.map(col => 
      Column.create({ 
        ...col, 
        board: board._id 
      })
    )
  );

  // Update board with column references
  board.columns = columns.map(col => col._id) as mongoose.ObjectId [];
  await board.save();

  return board;
};

