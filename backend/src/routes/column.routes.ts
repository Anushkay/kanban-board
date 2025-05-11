import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { addColumn } from "../controllers/column.controller";

const router = Router();

router.use(auth as any);

router.post("/", addColumn as any); 

export default router;