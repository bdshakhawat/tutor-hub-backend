import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  // validateRequest(AuthValidations.createUserZodSchema),
  AuthControllers.createUser
);

router.post(
  '/signin',
  validateRequest(AuthValidations.loginUserZodSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
