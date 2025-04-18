import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { TutorService } from './tutor.service';

const createTutor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorService.createTutor(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  }
);

const tutorStatusChange: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorService.tutorStatusChange(
      req.params.id,
      req.body.status
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  }
);

export const TutorController = {
  createTutor,
  tutorStatusChange,
};
