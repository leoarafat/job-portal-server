import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginCandidate
);
router.post(
  '/employee/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginEmployee
);

export const AuthRoutes = router;
