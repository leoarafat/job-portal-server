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
      required_error: 'required Skill id is required',
    }),
    education: z.string({
      required_error: 'education id is required',
    }),
    benefits: z.string({}).optional(),
    location: z.string({
      required_error: 'location id is required',
    }),
    companyName: z.string({
      required_error: 'company name id is required',
    }),
    salary: z.string({
      required_error: 'salary id is required',
    }),
    vacancy: z.number({
      required_error: 'vacancy id is required',
    }),
    jobCategory: z.string({
      required_error: 'job Category id is required',
    }),
    deadline: z.string({
      required_error: 'deadline id is required',
    }),
    type: z.string({
      required_error: 'Job type id is required',
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
    status: z.string({
      required_error: 'status is required',
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
    location: z.string().optional(),
    companyName: z.string().optional(),
    salary: z.string().optional(),
    vacancy: z.number().optional(),
    jobCategory: z.string().optional(),
    deadline: z.string().optional(),
    type: z.string().optional(),
    employeeId: z.string().optional(),
  }),
});

export const JobValidation = {
  create,
  update,
  apply,
  save,
};
