import { Types } from "mongoose"
import { IUserProfile } from "../user/user.interface"

export type ITutorProfile = {
  userId: Types.ObjectId | IUserProfile;
  subject: string;
  address: string;
  experience: number;
  status: 'pending' | 'accepted' | 'rejected';
};