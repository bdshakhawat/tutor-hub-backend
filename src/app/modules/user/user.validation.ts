import { z } from 'zod';

const updateUser = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    profileImgUrl: z.string().optional(),
    phonenumber: z.string().optional(),
  }),
});

export const UserValidations = {
  updateUser,
};
