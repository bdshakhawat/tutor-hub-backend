import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { IUserLoginResponse } from './auth.interface';
import { AuthServices } from './auth.service';

const creatingUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    // console.log(userData);

    const result = await AuthServices.createUer(userData);

    const { refreshToken, ...others } = result;
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IUserLoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: others,
    });
  }
);

const userLogin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await AuthServices.loginUser(userData);

    // set refreshToken into cookie
    const { refreshToken, ...others } = result;
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IUserLoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully!',
      data: others,
    });
  }
);

export const AuthenticationControllers = {
  createUser: creatingUser,
  loginUser: userLogin,
};
