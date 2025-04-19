import express from 'express';
import { ENUM_USER_ROLE } from '../../../userRole/user';
import auth from '../../middlewares/auth';
import requestValidating from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();
// Update user 
router.patch(
  '/:id',
  requestValidating(UserValidations.updateUser),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserControllers.updateUser
);
// Delete user
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserControllers.deleteUser
);
// Get Single user profile
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserControllers.getUserProfile
);
// Get all users
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserControllers.getAllUser
);
// Super Admin can change user role
router.patch(
  '/role-change/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserControllers.changeRole
);

export const UsersRoutes = router;
