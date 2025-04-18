import { Schema, model } from 'mongoose';
import { ITutorProfile } from './tutors.interface';

const tutorsSchema = new Schema<ITutorProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Tutor = model<ITutorProfile>('Tutor', tutorsSchema);
