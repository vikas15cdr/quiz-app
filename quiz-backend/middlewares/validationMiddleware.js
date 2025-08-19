import Joi from 'joi';
import { sendErrorResponse } from '../utils/apiResponse.js';

// Quiz validation schema
const quizSchema = Joi.object({
  title: Joi.string().required().min(5).max(100),
  questions: Joi.array().items(
    Joi.object({
      text: Joi.string().required(),
      options: Joi.array().items(Joi.string()).min(2).required(),
      correctAnswer: Joi.string().required()
    })
  ).min(1).required()
});

export const validateQuizInput = (req, res, next) => {
  const { error } = quizSchema.validate(req.body);
  if (error) {
    return sendErrorResponse(res, 400, error.details[0].message);
  }
  next();
};