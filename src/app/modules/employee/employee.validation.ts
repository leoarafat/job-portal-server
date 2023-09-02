import { CompanySize } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name  is required',
    }),

    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password id is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    facebookUrl: z.string().optional(),

    twitterUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
    companySize: z
      .enum([...Object.values(CompanySize)] as [string, ...string[]], {})
      .optional(),
    tin: z.string().optional(),
    tradeLicenseNumber: z.string().optional(),
    companyLogo: z.string().optional(),
    address: z.string().optional(),
    description: z.string().optional(),
    recruiterName: z.string().optional(),
    recruiterDesignation: z.string().optional(),
    recruiterNumber: z.string().optional(),
  }),
});

export const EmployeeValidation = {
  create,
  update,
};
