import { Response, NextFunction } from "express";
import { getBoardWithColumnsAndTasks } from "../services/board.service";
import { AuthenticatedRequest } from "../types/express"; // Add this import

export const getBoard = async (
  req: AuthenticatedRequest, 
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    
    const board = await getBoardWithColumnsAndTasks(req.user._id);
    res.json(board);
  } catch (error) {
    next(error); 
  }
};