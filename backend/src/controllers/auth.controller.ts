import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { ApiResponse } from "../utils/apiResponse";

export const signup = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  const result = await registerUser(email, password, firstName, lastName);
  new ApiResponse(res, 201, "User registered successfully", result);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  new ApiResponse(res, 200, "Login successful", result);
};