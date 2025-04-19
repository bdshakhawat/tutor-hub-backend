import express from 'express';
import requestValidating from '../../middlewares/validateRequest';
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
  requestValidating(AuthValidations.loginUserZodSchema),
  AuthControllers.loginUser
);

export const AuthenticationRoutes = router;
