import { JobCategory, LocationType, Type } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title  is required',
    }),

    positionSummery: z.string({
      required_error: 'position summery is required',
    }),
    jobResponsibilities: z.string({
      required_error: 'job responsibilities id is required',
    }),
    qualification: z.string({
      required_error: 'qualification id is required',
    }),
    requiredSkill: z.string({
      required_error: 'qualification id is required',
    }),

    education: z.string({
      required_error: 'education id is required',
    }),
    benefits: z.string({}).optional(),
    location: z.enum(
      [...Object.values(LocationType)] as [string, ...string[]],
      {
        required_error: 'Location is required',
      }
    ),
    companyName: z.string({
      required_error: 'company name id is required',
    }),
    salary: z.string({
      required_error: 'salary id is required',
    }),
    vacancy: z.string({
      required_error: 'vacancy id is required',
    }),
    jobCategory: z.enum(
      [...Object.values(JobCategory)] as [string, ...string[]],
      {
        required_error: 'Job category is required',
      }
    ),
    deadline: z.string({
      required_error: 'deadline id is required',
    }),
    type: z.enum([...Object.values(Type)] as [string, ...string[]], {
      required_error: 'Job Type is required',
    }),
    employeeId: z.string({
      required_error: 'employee id id is required',
    }),
  }),
});
const apply = z.object({
  body: z.object({
    candidateId: z.string({
      required_error: 'Candidate id is required',
    }),
    jobId: z.string({
      required_error: 'Candidate id is required',
    }),
    assessment: z.string({
      required_error: 'assessment is required',
    }),
    coverLetter: z.string({
      required_error: 'Cover Letter is required',
    }),
  }),
});
const save = z.object({
  body: z.object({
    candidateId: z.string({
      required_error: 'Candidate id is required',
    }),
    jobId: z.string({
      required_error: 'Candidate id is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    positionSummery: z.string().optional(),
    jobResponsibilities: z.string().optional(),
    qualification: z.string().optional(),
    requiredSkill: z.string().optional(),

    education: z.string().optional(),
    benefits: z.string().optional(),
    location: z
      .enum([...Object.values(LocationType)] as [string, ...string[]], {})
      .optional(),
    companyName: z.string().optional(),
    salary: z.string().optional(),
    vacancy: z.string().optional(),
    jobCategory: z
      .enum([...Object.values(JobCategory)] as [string, ...string[]], {})
      .optional(),
    deadline: z.string().optional(),
    type: z
      .enum([...Object.values(Type)] as [string, ...string[]], {})
      .optional(),
    employeeId: z.string().optional(),
  }),
});

export const JobValidation = {
  create,
  update,
  apply,
  save,
};
