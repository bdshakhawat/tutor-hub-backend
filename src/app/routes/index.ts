import express from 'express';
import { AuthRoutes } from '../modules/authentication/auth.route';
import { ServiceRoutes } from '../modules/subjects/service.route';
import { UserRoutes } from '../modules/user/user.route';
import { BookingRoutes } from '../modules/bookings/booking.route';
import { CourseReviewRoutes } from '../modules/reviews/serviceReview.route';
import { OrderRoutes } from '../modules/orders/order.route';
import { TutorRoute } from '../modules/tutors/tutor.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/services',
    routes: ServiceRoutes,
  },
  {
    path: '/bookings',
    routes: BookingRoutes,
  },
  {
    path: '/reviews',
    routes: CourseReviewRoutes,
  },
  {
    path: '/orders',
    routes: OrderRoutes,
  },
  {
    path: '/tutors',
    routes: TutorRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
