import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/payment-order', OrderController.paymentOrder);

router.post('/payment/success', OrderController.paymentSuccess);

router.post('/payment/fail', OrderController.paymentFail);

// router.post('/payment/cancel', OrderController.paymentCancel);

router.get('/by-transaction-id/:transectionId', OrderController.getSingleOrder);

// router.get('/by-student-id/:studentId', OrderController.getOrdersByStudentId);

// router.get('/by-course-id/:courseId', OrderController.getOrdersByCourseId);

export const OrderRoutes = router;
