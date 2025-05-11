import { Request, Response, NextFunction } from "express";
import { 
  createTaskService,
  updateTaskService,
  deleteTaskService
} from "../services/task.service";
import { ApiError } from "../utils/apiError";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, columnId, priority, assignedTo } = req.body;
    const task = await createTaskService({
      title,
      description,
      columnId,
      priority,
      assignedTo,
      userId: req.user._id
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const task = await updateTaskService(id, req.user._id, updateData);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await deleteTaskService(id, req.user._id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};