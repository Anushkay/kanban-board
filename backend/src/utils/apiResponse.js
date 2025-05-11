"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(res, statusCode, message, data = null, success = true) {
        res.status(statusCode).json({
            success,
            message,
            data,
        });
    }
}
exports.ApiResponse = ApiResponse;
exports.default = ApiResponse;
