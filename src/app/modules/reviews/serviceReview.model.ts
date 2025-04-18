import { Schema, model } from 'mongoose';
import { CourseReviewModel, ICourseReview } from './serviceReview.interface';

const courseReviewSchema = new Schema<ICourseReview, CourseReviewModel>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
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

export const CourseReview = model<ICourseReview, CourseReviewModel>(
  'CourseReview',
  courseReviewSchema
);
