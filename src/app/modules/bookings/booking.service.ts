
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (bookingData: IBooking) => {
  const result = await Booking.create(bookingData);
  return result;
};

const getAllBookings = async () => {
  const result = await Booking.find();
  return result;
};

const getBookingById = async (id: string) => {
  const result = await Booking.findById(id);
  return result;
};

const getBookingsByUserId = async (userId: string) => {
  const result = await Booking.find({ userId: userId });
  return result;
};

const checkBookingStatus = async (id: string) => {
  const result = await Booking.findById(id);
  return result?.status;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUserId,
  checkBookingStatus,
};





// import { paginationHelpers } from '../../../reusableFunctions/paginationHelper';
// import { IPaginations } from '../../../types/paginationType';
// import { IBooking } from './booking.interface';
// import { Booking } from './booking.model';

// const confirmBooking = async (data: IBooking): Promise<IBooking> => {
//   const result = await Booking.create(data);

//   return result;
// };

// const showallBookings = async (
//   paginationOptions: IPaginations
// ) => {
//   const { limit, page, skip } =
//     paginationHelpers.calculatePagination(paginationOptions);

//   const result = await Booking.find()
//     .populate('userId')
//     .populate('serviceId')
//     .skip(skip)
//     .limit(limit)
//     .lean();

//   const total = await Booking.countDocuments();

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

// const showallBookingByUserId = async (
//   id: string,
//   paginationOptions: IPaginations
// ) => {
//   const { limit, page, skip } =
//     paginationHelpers.calculatePagination(paginationOptions);

//   const result = await Booking.find({ userId: id })
//     .populate('userId')
//     .populate('serviceId')
//     .skip(skip)
//     .limit(limit)
//     .lean();

//   const total = await Booking.countDocuments({ userId: id });

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

// const updateBooking = async (
//   id: string,
//   data: IBooking
// ): Promise<IBooking | null> => {
//   const result = await Booking.findByIdAndUpdate(id, data, { new: true });

//   return result;
// };

// const deleteBooking = async (id: string): Promise<IBooking | null> => {
//   const result = await Booking.findByIdAndDelete(id);

//   return result;
// };

// const bookingConfirmation = async (id: string): Promise<IBooking | null> => {
//   const result = await Booking.findByIdAndUpdate(
//     id,
//     {
//       $set: {
//         status: true,
//       },
//     },
//     { new: true }
//   );

//   return result;
// };

// const getBookingsbyId = async (id: string): Promise<IBooking | null> => {
//   const result = await Booking.findById(id)
//     .populate('userId')
//     .populate('serviceId')
//     .lean();

//   return result;
// };

// export const BookingService = {
//   addBooking: confirmBooking,
//   getallBookings: showallBookings,
//   getAllBookingByUserId: showallBookingByUserId,
//   updateBooking,
//   deleteBooking,
//   bookingAccepts: bookingConfirmation,
//   getBookingsbyId,
// };
