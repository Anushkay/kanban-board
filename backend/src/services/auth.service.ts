import User from "../models/user";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import mongoose, { mongo, Mongoose, Types } from "mongoose";
import { createDefaultBoard } from "./board.service";

interface UserResponse {
  id: string;
  email: string;
  boardId?: string;
}

interface AuthResponse {
  user: UserResponse;
  token: string;
}

export const registerUser = async (email: string, password: string, firstName: string, lastName: string): Promise<AuthResponse> => {
  if (await User.findOne({ email })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ email, password: hashedPassword, firstName, lastName });
    const board = await createDefaultBoard(user._id as string);

 return {
    user: {
      id: (user._id as mongoose.ObjectId).toString(),
      email: user.email,
      boardId: board._id as string,
    },
    token: generateToken((user._id as mongoose.ObjectId).toString())
  };
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const user = await User.findOne({ email }).lean();
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  
  return {
    user: { 
      id: user._id.toString(),
      email: user.email 
    },
    token: generateToken(user._id.toString())
  };
};

