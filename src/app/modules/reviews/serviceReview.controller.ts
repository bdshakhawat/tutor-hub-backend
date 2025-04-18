import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../paging/pagination';
import catchAsync from '../../../utils/catchAsync';
import pick from '../../../utils/pick';
import sendResponse from '../../../utils/sendResponse';
import { CourseReviewService } from './serviceReview.service';
import { ICourseReview } from './serviceReview.interface';

const addCourseReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await CourseReviewService.addCourseReview(data);

    sendResponse<ICourseReview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review added successfully!',
      data: result,
    });
  }
);

const getSingleCourseReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CourseReviewService.getSingleCourseReview(id);

    sendResponse<ICourseReview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review fetched successfully!',
      data: result,
    });
  }
);

const getAllCourseReview = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const courseId = req.params.courseId;

  const result = await CourseReviewService.getAllCourseReviews(
    paginationOptions,
    courseId
  );

  sendResponse<ICourseReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getReviewsByStudentId = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const studentId = req.params.studentId;

  const result = await CourseReviewService.getReviewsByStudentId(
    paginationOptions,
    studentId
  );

  sendResponse<ICourseReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews by studentId retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateCourseReview = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId;
  const updatedData = req.body;

  const result = await CourseReviewService.updateCourseReview(
    reviewId,
    updatedData
  );

  sendResponse<ICourseReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully !',
    data: result,
  });
});

const deleteCourseReview = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId;

  const result = await CourseReviewService.deleteCourseReview(reviewId);

  sendResponse<ICourseReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully !',
    data: result,
  });
});


const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CourseReviewService.getAllReviews(paginationOptions);

  sendResponse<ICourseReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
})

export const CourseReviewController = {
  addCourseReview,
  getSingleCourseReview,
  getAllCourseReview,
  getReviewsByStudentId,
  updateCourseReview,
  deleteCourseReview,
  getAllReviews
};
