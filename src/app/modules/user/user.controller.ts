/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { IUserProfile } from './user.interface';
import { UserServices } from './user.service';
import pick from '../../../utils/pick';
import { paginationFields } from '../../../paging/pagination';

const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const id = req.params.id;

    const result = await UserServices.updateUser(id, userData);

    sendResponse<IUserProfile>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  }
);

const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.user;

    const result = await UserServices.deleteUser(id, user);

    sendResponse<IUserProfile>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  }
);

const getUserProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await UserServices.getUserProfile(id);

    sendResponse<IUserProfile>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  }
);

const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await UserServices.getAllUser(paginationOptions);

    sendResponse<IUserProfile[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users fetched successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

//! super_admin----------------------------------------------------------------
const changeRole: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    // console.log(id);

    const result = await UserServices.changeRole(id);

    sendResponse<IUserProfile>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Role changed successfully!',
      data: result,
    });
  }
);

export const UserControllers = {
  updateUser,
  deleteUser,
  getUserProfile,
  getAllUser,
  changeRole,
};
