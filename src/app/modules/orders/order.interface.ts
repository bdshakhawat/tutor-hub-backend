import { Model, Types } from 'mongoose';

export type IPaymentData = {
  address: string;
  batchId: string;
  bookingId: string;
  email: string;
  name: string;
  phonenumber: string;
  serviceId: string;
};

export type IOrder = {
  studentId: Types.ObjectId;
  serviceId: Types.ObjectId;
  bookingId: Types.ObjectId;
  batchId: string;
  transectionId: string;
  sessionkey?: string;
  paid: boolean;
  amount: number;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
