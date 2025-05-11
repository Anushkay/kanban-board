import { Request, Response, NextFunction } from "express";
import { createColumn } from "../services/column.service";
import { getBoardWithColumnsAndTasks, createDefaultBoard } from "../services/board.service";
import { ApiError } from "../utils/apiError";
import mongoose from "mongoose";

export const addColumn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      throw new ApiError(400, "Title is required");
    }

    let board = await getBoardWithColumnsAndTasks(req.user._id);
    if (!board) {
      board = await createDefaultBoard(req.user._id);
    }

    const column = await createColumn((board._id as mongoose.ObjectId).toString(), title);
    res.status(201).json(column);
  } catch (error) {
    next(error); 
  }
};
