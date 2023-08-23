"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: 'First Name is required',
        }),
        lastName: zod_1.z.string({
            required_error: 'Last Name is required',
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
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        nidNumber: zod_1.z.string().optional(),
        mobileNumber: zod_1.z.string().optional(),
        portfolioUrl: zod_1.z.string().optional(),
        facebookUrl: zod_1.z.string().optional(),
        linkedinUrl: zod_1.z.string().optional(),
        jobType: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        careerObjective: zod_1.z.string().optional(),
        educations: zod_1.z.string().optional(),
        experience: zod_1.z.string().optional(),
    }),
});
exports.CandidateValidation = {
    create,
    update,
};
