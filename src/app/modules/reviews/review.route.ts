import express from 'express';
// import requestValidating from '../../middlewares/validateRequest';
import { CourseReviewController } from './review.controller';
import requestValidating from '../../middlewares/validateRequest';
import { CourseReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  requestValidating  (CourseReviewValidation.addCourseReviewSchema),
  CourseReviewController.addCourseReview
);

router.get('/subject/:subjectId', CourseReviewController.getAllCourseReview);

router.get(
  '/student-review/:studentId',
  CourseReviewController.getReviewsByStudentId
);

router.patch('/:reviewsId', CourseReviewController.updateCourseReview);

router.delete('/:reviewsId', CourseReviewController.deleteCourseReview);

router.get('/', CourseReviewController.getAllReviews);

export const ReviewsRoutes = router;
