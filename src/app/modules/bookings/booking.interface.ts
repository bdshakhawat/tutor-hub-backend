import { Types } from "mongoose"
import { IUserProfile } from "../user/user.interface"
import { IService } from "../subjects/service.interface";

 type IBatch = {
  amountPerWeek: number;
  daysPerWeek: number;
  _id: Types.ObjectId;
};
 
 export type IBooking = {
    userId: Types.ObjectId | IUserProfile;
    serviceId: Types.ObjectId | IService
    status: boolean; // true = accepted, false = rejected
    batch: IBatch;
    startDate: string;
    endDate: string;
 }
