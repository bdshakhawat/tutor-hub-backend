import { z } from 'zod';

const IPriceSchema = z.object({
  amountPerWeek: z.number(),
  daysPerWeek: z.number(),
});

const addServiceSchema = z.object({
  body: z.object({
    instructorId: z.string({
      required_error: 'Instructor id is required',
    }),
    subject: z.string({
      required_error: 'Subject is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    image: z.string().optional(),
    price: z.array(IPriceSchema),
    level: z.enum(['junior', 'secondary', 'higher-secondary']),
    rating: z.number().optional(),
    location: z.string({
      required_error: 'Location is required',
    }),
    seats: z.number({
      required_error: 'Seats is required',
    }),
    enrolled: z.number().optional().default(0),
    isAvailable: z.boolean().optional().default(true),
    classtime: z.string({
      required_error: 'Classtime is required',
    }),
  }),
});

const updateServiceSchema = z.object({
  body: z.object({
    instructorId: z.string().optional(),
    subject: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    price: z.array(IPriceSchema).optional(),
    level: z.enum(['junior', 'secondary', 'higher-secondary']),
    rating: z.number().optional(),
    location: z.string().optional(),
    seats: z.number().optional(),
    enrolled: z.number().optional(),
    isAvailable: z.boolean().optional(),
    classtime: z.string().optional(),
  }),
});

export const ServiceValidations = {
  addServiceSchema,
  updateServiceSchema,
};
