import { Types } from "mongoose"
import { IUserProfile } from "../user/user.interface"

export type ITutorProfile = {
  userId: Types.ObjectId | IUserProfile;
  subject: string;
  address: string;
  experience: number;
  status: 'pending' | 'accepted' | 'rejected';
  hourlyRate?: number;
  education?: string[];
  teachingMethods?: string;
  availability?: string[];
  qualifications?: {
    degree: string;
    institution: string;
    year: number;
  }[];
  languages?: string[];
};