import z from 'zod';

const addCourseReviewSchema = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'Student ID is required.',
    }),
    courseId: z.string({
      required_error: 'Course ID is required.',
    }),
    description: z.string({
      required_error: 'Description is required.',
    }),
    rating: z.number({
      required_error: 'Rating is required.',
    }),
  }),
});

const updateCourseReviewSchema = z.object({
  body: z.object({
    studentId: z.string().optional(),
    courseId: z.string().optional(),
    description: z.string().optional(),
    rating: z.number().optional(),
  }),
});

export const CourseReviewValidation = {
  addCourseReviewSchema,
  updateCourseReviewSchema
};
