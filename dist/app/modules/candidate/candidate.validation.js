"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password id is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        gender: zod_1.z
            .enum([...Object.values(client_1.Gender)], {})
            .optional(),
        nidNumber: zod_1.z.string().optional(),
        mobileNumber: zod_1.z.string().optional(),
        portfolioUrl: zod_1.z.string().optional(),
        facebookUrl: zod_1.z.string().optional(),
        linkedinUrl: zod_1.z.string().optional(),
        jobType: zod_1.z
            .enum([...Object.values(client_1.JobType)], {})
            .optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        careerObjective: zod_1.z.string().optional(),
        educations: zod_1.z.string().optional(),
        experience: zod_1.z.string().optional(),
        isComplete: zod_1.z.boolean().optional(),
    }),
});
exports.CandidateValidation = {
    create,
    update,
};
