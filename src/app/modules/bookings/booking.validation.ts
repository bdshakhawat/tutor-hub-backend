import { z } from 'zod';

const addBookingZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User ID is required',
    }),
    serviceId: z.string({
      required_error: 'Service ID is required',
    }),
    status: z.boolean({
      required_error: 'Status is required',
    }),
    batch: z.object({
      amountPerWeek: z.number({
        required_error: 'Amount per week is required',
      }),
      daysPerWeek: z.number({
        required_error: 'Days per week is required',
      }),
      _id: z.string({
        required_error: 'Batch ID is required',
      }),
    }),
    startDate: z.string({
      required_error: 'Start date is required',
    }),
    endDate: z.string({
      required_error: 'End date is required',
    }),
  }),
});

export const BookingValidation = {
    addBookingZodSchema
}
