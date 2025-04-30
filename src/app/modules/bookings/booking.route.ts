
import express from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../userRole/user';

const router = express.Router();

router.post(
  '/add-booking',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.createBooking
);

router.get(
  '/all-booking',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getAllBookings
);

router.get(
  '/user/:userId',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getBookingsByUserId
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getBookingById
);

router.get(
  '/check-status/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.checkBookingStatus
);

export const BookingRoutes = router;




// import express from 'express';
// import { ENUM_USER_ROLE } from '../../../userRole/user';
// import auth from '../../middlewares/auth';
// import requestValidating from '../../middlewares/validateRequest';
// import { BookingController } from './booking.controller';
// import { BookingValidation } from './booking.validation';

// const router = express.Router();

// router.post(
//   '/add-booking',
//   auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   requestValidating(BookingValidation.addBookingZodSchema),
//   BookingController.addBooking
// );

// router.get(
//   '/all-booking',
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   BookingController.getallBookings
// );

// router.get('/single-booking/:id', BookingController.getBookingById);

// router.get(
//   '/user-booking/:userId',
//   auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   BookingController.getAllBookingByUserId
// );

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   BookingController.deleteBooking
// );

// router.patch(
//   '/check-status/:id',
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   BookingController.bookingAccepts
// );

// export const BookingsRoutes = router;
