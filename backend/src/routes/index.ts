import { Router } from "express";
import authRoutes from "./auth.routes";
import boardRoutes from './board.routes';
import columnRoutes from './column.routes';
import taskRoutes from './task.routes';

const router = Router();

//Auth
router.use("/auth", authRoutes);

// Board 
router.use("/board", boardRoutes);

//Column 
router.use("/column", columnRoutes);

//Tasks
router.use("/task", taskRoutes);

export default router;

