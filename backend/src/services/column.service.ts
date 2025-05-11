import { ApiError } from "../utils/apiError";
import Column from "../models/column";
import Board from '../models/board';

export const createColumn = async (boardId: string, title: string) => {
  const column = await Column.create({ title, board: boardId });
  
  await Board.findByIdAndUpdate(
    boardId,
    { $push: { columns: column._id } },
    { new: true }
  );

  return column;
};