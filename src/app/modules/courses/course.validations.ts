import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    photoUrl: z.string({
      required_error: 'photoUrl is required',
    }),
    owner: z.string({
      required_error: 'Owner is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    photoUrl: z.string().optional(),
    owner: z.string().optional(),
    price: z.number().optional(),
  }),
});

export const CourseValidation = {
  create,
  update,
};
