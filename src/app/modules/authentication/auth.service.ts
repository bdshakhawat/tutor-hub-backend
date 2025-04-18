import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../reusableFunctions/jwtHelpers';
import { IUserProfile } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const createUer = async (
  payload: IUserProfile
): Promise<ILoginUserResponse> => {
  const user = await User.create(payload);

  const { id, email, role } = user;

  const accessToken = jwtHelpers.createToken(
    { email, role, id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { email, role, id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginUser = async (userData: ILoginUser): Promise<ILoginUserResponse> => {
  const { email: loggedEmail, password } = userData;

  const isUserExist = await User.findOne(
    { email: loggedEmail },
    { id: 1, password: 1, email: 1, role: 1 }
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.password) {
    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
    }
  }

  const { email, role, id } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { email, role, id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { email, role, id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  createUer,
  loginUser,
};
