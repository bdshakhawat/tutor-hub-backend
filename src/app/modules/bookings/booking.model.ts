import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    batch: {
      amountPerWeek: {
        type: Number,
        required: true,
      },
      daysPerWeek: {
        type: Number,
        required: true,
      },
      _id: {
        type: Schema.Types.ObjectId,
        required: true,
      }
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Booking = model<IBooking>('Booking', bookingSchema);
