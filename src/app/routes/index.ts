
import express from 'express';
import { AuthenticationRoutes } from '../modules/authentication/auth.route';
import { SubjectsRoutes } from '../modules/subjects/subject.route';
import { UsersRoutes } from '../modules/user/user.route';
import { BookingRoutes } from '../modules/bookings/booking.route';
import { ReviewsRoutes } from '../modules/reviews/review.route';
import { PaymentOrderRoutes } from '../modules/ordersPayment/order.route';
import { TutorsRoute } from '../modules/tutors/tutor.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthenticationRoutes,
  },
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/subjects',
    route: SubjectsRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/reviews',
    route: ReviewsRoutes,
  },
  {
    path: '/orders',
    route: PaymentOrderRoutes,
  },
  {
    path: '/tutors',
    route: TutorsRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;



// import express from 'express';
// import { AuthenticationRoutes } from '../modules/authentication/auth.route';
// import { SubjectsRoutes } from '../modules/subjects/subject.route';
// import { UsersRoutes } from '../modules/user/user.route';
// import { BookingsRoutes } from '../modules/bookings/booking.route';
// import { ReviewsRoutes } from '../modules/reviews/review.route';
// import { PaymentOrderRoutes } from '../modules/ordersPayment/order.route';
// import { TutorsRoute } from '../modules/tutors/tutor.route';

// const router = express.Router();

// const moduleRoutes = [
//   {
//     path: '/auth',
//     routes: AuthenticationRoutes,
//   },
//   {
//     path: '/users',
//     routes: UsersRoutes,
//   },
//   {
//     path: '/subjects',
//     routes: SubjectsRoutes,
//   },
//   {
//     path: '/bookings',
//     routes: BookingsRoutes,
//   },
//   {
//     path: '/reviews',
//     routes: ReviewsRoutes,
//   },
//   {
//     path: '/orders',
//     routes: PaymentOrderRoutes,
//   },
//   {
//     path: '/tutors',
//     routes: TutorsRoute,
//   },
// ];

// moduleRoutes.forEach(route => router.use(route.path, route.routes));
// export default router;
