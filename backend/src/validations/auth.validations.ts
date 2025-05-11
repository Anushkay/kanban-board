// validations/auth.validations.ts
import Joi from 'joi';

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    'string.base': 'First name must be a string',
    'string.min': 'First name must be at least 2 characters',
    'any.required': 'First name is required'
  }),
  lastName: Joi.string().min(2).required().messages({
    'string.base': 'Last name must be a string',
    'string.min': 'Last name must be at least 2 characters',
    'any.required': 'Last name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
      'any.required': 'Password is required'
    })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});
