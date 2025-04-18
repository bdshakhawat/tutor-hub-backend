import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUserProfile } from './user.interface';

const userSchema = new Schema<IUserProfile>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'tutor', 'admin','super_admin'],
    },
    profileImgUrl: {
      type: String,
    },
    phonenumber: {
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

userSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bycrypt_salt_rounds)
    );
  }

  next();
});

export const User = model<IUserProfile>('User', userSchema);
