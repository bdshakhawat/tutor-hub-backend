import express from 'express';
import requestValidating from '../../middlewares/validateRequest';
import { CourseReviewController } from './review.controller';
import { CourseReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/add-reviews',
  requestValidating(CourseReviewValidation.addCourseReviewSchema),
  CourseReviewController.addCourseReview
);

router.get('/subject/:subjectId', CourseReviewController.getAllCourseReview);

router.get(
  '/student-review/:studentId',
  CourseReviewController.getReviewsByStudentId
);

router.patch('update/:reviewsId', CourseReviewController.updateCourseReview);

router.delete('delete/:reviewsId', CourseReviewController.deleteCourseReview);

router.get('/allreviews', CourseReviewController.getAllReviews);

export const ReviewsRoutes = router;
