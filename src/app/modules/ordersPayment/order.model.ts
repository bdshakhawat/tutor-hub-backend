import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const OrderSchema = new Schema<IOrder, OrderModel>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    batchId: {
      type: String,
      required: true,
    },
    transectionId: {
      type: String,
      required: true,
    },
    sessionkey: {
      type: String,
    },
    paid: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: Number,
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

export const Orders = model<IOrder, OrderModel>('Orders', OrderSchema);
