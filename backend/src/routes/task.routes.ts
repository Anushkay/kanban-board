import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { 
  createTask, 
  updateTask, 
  deleteTask 
} from "../controllers/task.controller";

const router = Router();

router.use(auth); // Protect all task routes

router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;