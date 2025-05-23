
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BookingService } from './booking.service';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;
  const result = await BookingService.createBooking(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.getBookingById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

const getBookingsByUserId = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await BookingService.getBookingsByUserId(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully for user',
    data: result,
  });
});

const checkBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.checkBookingStatus(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking status checked successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUserId,
  checkBookingStatus,
};




// import { Request, Response } from 'express';
// import httpStatus from 'http-status';
// import { paginationFields } from '../../../paging/pagination';
// import catchAsync from '../../../utils/catchAsync';
// import selectPick from '../../../utils/selectedPick';
// import sendResponse from '../../../utils/sendResponse';
// import { IBooking } from './booking.interface';
// import { BookingService } from './booking.service';

// const confirmBooking = catchAsync(async (req: Request, res: Response) => {
//   const data = req.body;
//   const result = await BookingService.addBooking(data);

//   sendResponse<IBooking>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Service booked successfully !',
//     data: result,
//   });
// });

// const showallBookings = catchAsync(async (req: Request, res: Response) => {
//   const paginationOptions = selectPick(req.query, paginationFields);

//   const result = await BookingService.getallBookings(paginationOptions);

//   sendResponse<IBooking[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Bookings retrieved successfully !',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// const showallBookingByUserId = catchAsync(
//   async (req: Request, res: Response) => {
//     const userId = req.params.userId;
//     const paginationOptions = selectPick(req.query, paginationFields);

//     const result = await BookingService.getAllBookingByUserId(
//       userId,
//       paginationOptions
//     );

//     sendResponse<IBooking[]>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Booking by user id retrieved successfully !',
//       meta: result.meta,
//       data: result.data,
//     });
//   }
// );

// const deleteBooking = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await BookingService.deleteBooking(id);

//   sendResponse<IBooking>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Booking deleted successfully !',
//     data: result,
//   });
// });

// const bookingConfirmation = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await BookingService.bookingAccepts(id);

//   sendResponse<IBooking>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Booking accepted successfully !',
//     data: result,
//   });
// });

// const getBookingsbyId = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await BookingService.getBookingsbyId(id);

//   sendResponse<IBooking>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Booking by id retrieved successfully !',
//     data: result,
//   });
// });

// export const BookingController = {
//   addBooking: confirmBooking,
//   getallBookings: showallBookings,
//   getAllBookingByUserId: showallBookingByUserId,
//   deleteBooking,
//   bookingAccepts: bookingConfirmation,
//   getBookingsbyId,
// };
