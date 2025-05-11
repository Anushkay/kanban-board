import { Response } from "express";

export class ApiResponse {
  constructor(
    res: Response,
    statusCode: number,
    message: string,
    data: any = null,
    success: boolean = true
  ) {
    res.status(statusCode).json({
      success,
      message,
      data,
    });
  }
}

export default ApiResponse;