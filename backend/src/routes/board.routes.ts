import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { getBoard } from "../controllers/board.controller";

const router = Router();

router.use(auth as any);

router.get("/", getBoard as any); 

export default router;