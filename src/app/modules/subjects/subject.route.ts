import express from 'express';
import { ENUM_USER_ROLE } from '../../../userRole/user';
import auth from '../../middlewares/auth';
import requestValidating from '../../middlewares/validateRequest';
import { ServiceControllers } from './subject.controller';
import { ServiceValidations } from './subject.validation';

const router = express.Router();

router.post(
  '/add-subject',
  requestValidating(ServiceValidations.addServiceSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceControllers.createService
);

router.patch(
  '/update-subject/:id',
  requestValidating(ServiceValidations.updateServiceSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceControllers.updateService
);

router.get('/:id', ServiceControllers.getSingleService);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceControllers.deleteService
);

router.get('/', ServiceControllers.getAllService);

export const SubjectsRoutes = router;
