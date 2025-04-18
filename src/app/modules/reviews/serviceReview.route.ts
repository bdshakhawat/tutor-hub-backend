import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseReviewController } from './serviceReview.controller';
import { CourseReviewValidation } from './serviceReview.validation';

const router = express.Router();

router.post(
  '/add-review',
  validateRequest(CourseReviewValidation.addCourseReviewSchema),
  CourseReviewController.addCourseReview
);

router.get('/:courseId', CourseReviewController.getAllCourseReview);

router.get(
  '/student-reviews/:studentId',
  CourseReviewController.getReviewsByStudentId
);

router.patch('/:reviewId', CourseReviewController.updateCourseReview);

router.delete('/:reviewId', CourseReviewController.deleteCourseReview);

router.get('/', CourseReviewController.getAllReviews);

export const CourseReviewRoutes = router;
