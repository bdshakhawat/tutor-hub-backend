import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required.',
    }),
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
    }),
    profileImgUrl: z.string().optional(),
    phonenumber: z.string({
      required_error: 'Phone number is required.',
    }),
    role: z.literal('user').optional(),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const AuthValidations = {
  createUserZodSchema,
  loginUserZodSchema,
};
