import { Types } from 'mongoose';
import { IUserProfile } from '../user/user.interface';

export type IPrice = {
  amountPerWeek: number;
  daysPerWeek: number;
};

export type IService = {
  instructorId: Types.ObjectId | IUserProfile;
  subject: string;
  description: string;
  image?: string;
  price: IPrice[];
  level: 'junior' | 'secondary' | 'higher-secondary';
  rating?: number;
  location: string;
  seats: number;
  enrolled: number;
  isAvailable: boolean;
  classtime: string;
  isPopular?: boolean;
};

export type IBooking = {
  startTime: Date;
  endTime: Date;
};

export type IServiceFilters = {
  searchTerm?: string;
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  level?: 'junior' | 'secondary' | 'higher-secondary';
};
