import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validations/auth.validations";

const router = Router();

router.post("/signup", validate(registerSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;