/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import httpStatus from 'http-status';
import SSLCommerzPayment from 'sslcommerz-lts';
import { v4 as uuidv4 } from 'uuid';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { Booking } from '../bookings/booking.model';
import { Service } from '../subjects/service.model';
import { User } from '../user/user.model';
import { IOrder, IPaymentData } from './order.interface';
import { Orders } from './order.model';

const paymentOrder = async (order: IPaymentData, res: Response) => {
  const {
    name,
    email: studentEmail,
    phonenumber,
    address,
    bookingId,
    serviceId,
    batchId,
  } = order;

  //! check student exist or not. if exist get data
  const student = await User.findOne({ email: studentEmail });
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student does not exist');
  }
  const { id } = student;

  // !  check course exist or not. if exist get data
  const course = await Service.findById({ _id: serviceId });
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course does not exist');
  }
  const { subject, level } = course;

  //! booking
  const booking = await Booking.findById({ _id: bookingId });
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking does not exist');
  }

  const transectionId = uuidv4();

  const data = {
    total_amount: booking?.batch?.amountPerWeek,
    currency: 'BDT',
    tran_id: transectionId, // use unique tran_id for each api call
    success_url: `https://elite-educators-backend.vercel.app/api/v1/orders/payment/success?transectionId=${transectionId}`,
    fail_url: `https://elite-educators-backend.vercel.app/api/v1/orders/payment/fail?transectionId=${transectionId}`,
    cancel_url: `https://elite-educators-backend.vercel.app/api/v1/orders/payment/cancel?transectionId=${transectionId}`,
    ipn_url: 'http://localhost:5000/api/v1/orders/payment/ipn',
    shipping_method: 'Courier',
    product_name: subject,
    product_category: level,
    product_profile: 'general',
    cus_name: name,
    cus_email: studentEmail,
    cus_add1: address,
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: phonenumber,
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const store_id = config.storeId;
  const store_passwd = config.storePassword;
  const is_live = false; //true for live, false for sandbox

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  sslcz.init(data).then(async (apiResponse: any) => {
    // console.log(apiResponse.failedreason);
    if (apiResponse.status === 'FAILED') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Payment Failed');
    }

    // eslint-disable-next-line prefer-const
    let GatewayPageURL = apiResponse.GatewayPageURL;

    const data = {
      studentId: id,
      serviceId,
      bookingId,
      batchId,
      transectionId,
      paid: false,
      amount: booking?.batch?.amountPerWeek,
      sessionkey: apiResponse.sessionkey,
    };
    await Orders.create(data);

    res.send({ url: GatewayPageURL });
  });
};

const paymentSuccess = async (transectionId: any, res: Response) => {
  const order = await Orders.findOneAndUpdate(
    { transectionId },
    {
      $set: {
        paid: true,
      },
    },
    {
      new: true,
    }
  );

  // let userRole;

  // if (order?.paid) {
  //   const session = await mongoose.startSession();
  //   try {
  //     session.startTransaction();

  //     const student = await User.findByIdAndUpdate(
  //       { _id: order.studentId },
  //       {
  //         $set: {
  //           role: 'student',
  //         },
  //         $push: {
  //           enrolledCourses: {
  //             courseId: order.courseId,
  //           },
  //         },
  //       },
  //       {
  //         new: true,
  //       }
  //     );

  //     userRole = student?.role;
  //     console.log(student);

  //     await Course.findByIdAndUpdate(
  //       { _id: order.courseId },
  //       {
  //         $inc: {
  //           totalEnrolled: 1,
  //         },
  //       },
  //       {
  //         new: true,
  //       }
  //     );

  //     await session.commitTransaction();
  //     await session.endSession();
  //   } catch (error) {
  //     await session.abortTransaction();
  //     await session.endSession();
  //     throw error;
  //   }
  // }

  if (order?.paid) {
    res.redirect(
      `https://elite-educators-frontend.vercel.app/services/payment/${transectionId}`
    );
  }
};

const paymentFail = async (transectionId: any, res: Response) => {
  const result = await Orders.findOneAndDelete({ transectionId });

  if (!result?.paid) {
    res.redirect(
      `https://elite-educators-frontend.vercel.app/services/payment/${transectionId}`
    );
  }
};

// const paymentCancel = async (transectionId: any, res: Response) => {
//   const result = await Orders.findOneAndDelete({ transectionId });

//   if (!result?.paid) {
//     res.redirect(`https://dminstitutebd.vercel.app/payment/status/failed`);
//   }
// };

// by transenction id
const getSingleOrder = async (transectionId: string): Promise<IOrder> => {
  const result = await Orders.findOne({ transectionId })
    .populate('studentId')
    .populate('serviceId')
    .populate('bookingId');

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order does not exist');
  }

  return result;
};

// const getOrdersByStudentId = async (studentId: string): Promise<IOrder[]> => {
//   const result = await Orders.find({ studentId })
//     .populate('studentId')
//     .populate('courseId');

//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Orders did not exist');
//   }

//   return result;
// };

// const getOrdersByCourseId = async (courseId: string): Promise<IOrder[]> => {
//   const result = await Orders.find({ courseId })
//     .populate('studentId')
//     .populate('courseId');

//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Orders did not exist');
//   }

//   return result;
// };

export const OrderService = {
  paymentOrder,
  paymentSuccess,
  getSingleOrder,
  paymentFail,
  // getOrdersByStudentId,
  // getOrdersByCourseId,
  // paymentCancel,
};
