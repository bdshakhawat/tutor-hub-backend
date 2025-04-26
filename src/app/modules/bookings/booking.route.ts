import express from 'express';
import { ENUM_USER_ROLE } from '../../../userRole/user';
import auth from '../../middlewares/auth';
import requestValidating from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/add-booking',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  requestValidating(BookingValidation.addBookingZodSchema),
  BookingController.addBooking
);

router.get(
  '/allbooking',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getallBookings
);

router.get('/confirm-bookingById/:id', BookingController.getBookingsbyId);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getAllBookingByUserId
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.deleteBooking
);

router.patch(
  '/check-status/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.bookingAccepts
);

export const BookingsRoutes = router;
