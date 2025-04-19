import express from 'express';
import requestValidating from '../../middlewares/validateRequest';
import { AuthenticationControllers } from './auth.controller';
import { AuthenticationValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  // validateRequest(AuthValidations.createUserZodSchema),
  AuthenticationControllers.createUser
);

router.post(
  '/signin',
  requestValidating(AuthenticationValidations.loginUserZodSchema),
  AuthenticationControllers.loginUser
);

export const AuthenticationRoutes = router;
