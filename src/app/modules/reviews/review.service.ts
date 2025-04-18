/* eslint-disable @typescript-eslint/no-non-null-assertion */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/statuscodeError';
import { paginationHelpers } from '../../../reusableFunctions/paginationHelper';
import { IPaginationOptions } from '../../../types/paginationType';
import { ICourseReview } from './review.interface';
import { User } from '../user/user.model';
import { Service } from '../subjects/subject.model';
import { CourseReview } from './review.model';

const addCourseReview = async (
  payload: ICourseReview
): Promise<ICourseReview> => {
  const { rating, courseId, studentId } = payload;

  const isStudentExist = await User.findById({ _id: studentId });
  if (!isStudentExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const isCourseExist = await Service.findById({ _id: courseId });
  if (!isCourseExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  let result = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const totalRating = isCourseExist.rating! + rating;
    const totalPeople = isCourseExist.enrolled! + 1;

    const newRating = (totalRating / totalPeople).toFixed(1);

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const updateCourse = await Service.findByIdAndUpdate(
      { _id: courseId },
      {
        $set: {
          rating: newRating,
          enrolled: totalPeople,
        },
      },
      { new: true }
    );

    result = await CourseReview.create(payload);

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return result;
};

const getSingleCourseReview = async (
  id: string
): Promise<ICourseReview | null> => {
  const result = await CourseReview.findById(id);

  return result;
};

// : courseid
const getAllCourseReviews = async (
  paginationOptions: IPaginationOptions,
  courseId: string
) => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await CourseReview.find({ courseId })
    .populate('studentId')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await CourseReview.countDocuments({ courseId });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getReviewsByStudentId = async (
  paginationOptions: IPaginationOptions,
  studentId: string
) => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await CourseReview.find({ studentId })
    .populate('studentId')
    .skip(skip)
    .limit(limit);

  const total = await CourseReview.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateCourseReview = async (
  reviewId: string,
  updatedData: Partial<ICourseReview>
): Promise<ICourseReview | null> => {
  const result = await CourseReview.findByIdAndUpdate(
    { _id: reviewId },
    updatedData,
    {
      new: true,
    }
  );

  return result;
};

const deleteCourseReview = async (
  reviewId: string
): Promise<ICourseReview | null> => {
  const result = await CourseReview.findByIdAndDelete({ _id: reviewId });

  return result;
};


const getAllReviews = async (
  paginationOptions: IPaginationOptions,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      if (sortOrder === 'asc' || sortOrder === 'desc') {
        sortConditions[sortBy] = sortOrder as SortOrder;
      }
    }

  const result = await CourseReview.find()
    .populate('studentId')
    .populate('courseId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await CourseReview.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const CourseReviewService = {
  addCourseReview,
  getSingleCourseReview,
  getAllCourseReviews,
  getReviewsByStudentId,
  updateCourseReview,
  deleteCourseReview,
  getAllReviews,
};
