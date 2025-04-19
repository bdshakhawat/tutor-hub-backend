import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/order-payment', OrderController.paymentOrder);

router.post('/payment/successfully', OrderController.paymentSuccess);

router.post('/payment/failed', OrderController.paymentFail);

// router.post('/payment/cancel', OrderController.paymentCancel);

router.get('/with-transaction-id/:transectionId', OrderController.getSingleOrder);

// router.get('/by-student-id/:studentId', OrderController.getOrdersByStudentId);

// router.get('/by-course-id/:courseId', OrderController.getOrdersByCourseId);

export const PaymentOrderRoutes = router;
