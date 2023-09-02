import { Gender, JobType } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
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

    email: z.string().optional(),
    gender: z
      .enum([...Object.values(Gender)] as [string, ...string[]], {})
      .optional(),
    nidNumber: z.string().optional(),
    mobileNumber: z.string().optional(),
    portfolioUrl: z.string().optional(),
    facebookUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
    jobType: z
      .enum([...Object.values(JobType)] as [string, ...string[]], {})
      .optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    careerObjective: z.string().optional(),
    educations: z.string().optional(),
    experience: z.string().optional(),
    isComplete: z.boolean().optional(),
  }),
});

export const CandidateValidation = {
  create,
  update,
};
