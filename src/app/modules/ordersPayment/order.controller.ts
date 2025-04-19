import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { OrderService } from './order.service';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { IOrder } from './order.interface';

const paymentOrder = catchAsync(async (req: Request, res: Response) => {
  const order = req.body;
  // console.log(order);

  await OrderService.paymentOrder(order, res);
});

const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  const { transectionId } = req.query;

  await OrderService.paymentSuccess(transectionId, res);
});

const paymentFail = catchAsync(async (req: Request, res: Response) => {
  const { transectionId } = req.query;

  await OrderService.paymentFail(transectionId, res);
});

// const paymentCancel = catchAsync(async (req: Request, res: Response) => {
//   const { transectionId } = req.query;

//   await OrderService.paymentCancel(transectionId, res);
// });

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const transectionId = req.params.transectionId;

  const result = await OrderService.getSingleOrder(transectionId);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order by transection id fetched successfully',
    data: result,
  });
});

// const getOrdersByStudentId = catchAsync(async (req: Request, res: Response) => {
//   const studentId = req.params.studentId;

//   const result = await OrderService.getOrdersByStudentId(studentId);

//   sendResponse<IOrder[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order by student id fetched successfully',
//     data: result,
//   });
// });

// const getOrdersByCourseId = catchAsync(async (req: Request, res: Response) => {
//   const courseId = req.params.courseId;

//   const result = await OrderService.getOrdersByCourseId(courseId);

//   sendResponse<IOrder[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order by course id fetched successfully',
//     data: result,
//   });
// });

export const OrderController = {
  paymentOrder,
  paymentSuccess,
  getSingleOrder,
  paymentFail,
  // getOrdersByStudentId,
  // getOrdersByCourseId,
  // paymentCancel,
};
