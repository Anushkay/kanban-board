"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
// validations/auth.validations.ts
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(2).required().messages({
        'string.base': 'First name must be a string',
        'string.min': 'First name must be at least 2 characters',
        'any.required': 'First name is required'
    }),
    lastName: joi_1.default.string().min(2).required().messages({
        'string.base': 'Last name must be a string',
        'string.min': 'Last name must be at least 2 characters',
        'any.required': 'Last name is required'
    }),
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: joi_1.default.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
        .required()
        .messages({
        'string.min': 'Password must be at least 8 characters',
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
        'any.required': 'Password is required'
    })
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: joi_1.default.string().required().messages({
        'any.required': 'Password is required'
    })
});
