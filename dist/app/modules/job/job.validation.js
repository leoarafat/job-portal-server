"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title  is required',
        }),
        positionSummery: zod_1.z.string({
            required_error: 'position summery is required',
        }),
        jobResponsibilities: zod_1.z.string({
            required_error: 'job responsibilities id is required',
        }),
        qualification: zod_1.z.string({
            required_error: 'qualification id is required',
        }),
        requiredSkill: zod_1.z.string({
            required_error: 'qualification id is required',
        }),
        education: zod_1.z.string({
            required_error: 'education id is required',
        }),
        benefits: zod_1.z.string({}).optional(),
        location: zod_1.z.enum([...Object.values(client_1.LocationType)], {
            required_error: 'Location is required',
        }),
        companyName: zod_1.z.string({
            required_error: 'company name id is required',
        }),
        salary: zod_1.z.string({
            required_error: 'salary id is required',
        }),
        vacancy: zod_1.z.string({
            required_error: 'vacancy id is required',
        }),
        jobCategory: zod_1.z.enum([...Object.values(client_1.JobCategory)], {
            required_error: 'Job category is required',
        }),
        deadline: zod_1.z.string({
            required_error: 'deadline id is required',
        }),
        type: zod_1.z.enum([...Object.values(client_1.Type)], {
            required_error: 'Job Type is required',
        }),
        employeeId: zod_1.z.string({
            required_error: 'employee id id is required',
        }),
    }),
});
const apply = zod_1.z.object({
    body: zod_1.z.object({
        candidateId: zod_1.z.string({
            required_error: 'Candidate id is required',
        }),
        jobId: zod_1.z.string({
            required_error: 'Candidate id is required',
        }),
        assessment: zod_1.z.string({
            required_error: 'assessment is required',
        }),
        coverLetter: zod_1.z.string({
            required_error: 'Cover Letter is required',
        }),
    }),
});
const save = zod_1.z.object({
    body: zod_1.z.object({
        candidateId: zod_1.z.string({
            required_error: 'Candidate id is required',
        }),
        jobId: zod_1.z.string({
            required_error: 'Candidate id is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        positionSummery: zod_1.z.string().optional(),
        jobResponsibilities: zod_1.z.string().optional(),
        qualification: zod_1.z.string().optional(),
        requiredSkill: zod_1.z.string().optional(),
        education: zod_1.z.string().optional(),
        benefits: zod_1.z.string().optional(),
        location: zod_1.z
            .enum([...Object.values(client_1.LocationType)], {})
            .optional(),
        companyName: zod_1.z.string().optional(),
        salary: zod_1.z.string().optional(),
        vacancy: zod_1.z.string().optional(),
        jobCategory: zod_1.z
            .enum([...Object.values(client_1.JobCategory)], {})
            .optional(),
        deadline: zod_1.z.string().optional(),
        type: zod_1.z
            .enum([...Object.values(client_1.Type)], {})
            .optional(),
        employeeId: zod_1.z.string().optional(),
    }),
});
exports.JobValidation = {
    create,
    update,
    apply,
    save,
};
