/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/statuscodeError';
import { paginationHelpers } from '../../../reusableFunctions/paginationHelper';
import { IPaginationOptions } from '../../../types/paginationType';
import { IUserProfile } from './user.interface';
import { User } from './user.model';

const updateUser = async (
  id: string,
  payload: Partial<IUserProfile>
): Promise<IUserProfile | null> => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { role, password, ...others } = payload;

  const updatedUser = await User.findByIdAndUpdate(id, others, {
    new: true,
  });

  return updatedUser;
};

const deleteUser = async (
  id: string,
  user: any
): Promise<IUserProfile | null> => {
  if (user.role === 'user' && user.id !== id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You cannot delete this user');
  }

  const result = await User.findByIdAndDelete(id);

  return result;
};

const getUserProfile = async (id: string): Promise<IUserProfile | null> => {
  const result = await User.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return result;
};

const getAllUser = async (paginationOptions: IPaginationOptions) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    if (sortOrder === 'asc' || sortOrder === 'desc') {
      sortConditions[sortBy] = sortOrder as SortOrder;
    }
  }

  const result = await User.find().sort(sortConditions).skip(skip).limit(limit);

  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//! super_admin----------------------------------------------------------------
// change role user to admin, admin to user
const changeRole = async (id: string) => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (isExist.role === 'super_admin') {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You cannot change role this user'
    );
  }

  // console.log(isExist);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role: isExist.role === 'admin' ? 'user' : 'admin' },
    {
      new: true,
    }
  );

  return updatedUser;
};

export const UserServices = {
  updateUser,
  getUserProfile,
  getAllUser,
  deleteUser,
  changeRole,
};
