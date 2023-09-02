"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name  is required',
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
        phoneNumber: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        website: zod_1.z.string().optional(),
        facebookUrl: zod_1.z.string().optional(),
        twitterUrl: zod_1.z.string().optional(),
        linkedinUrl: zod_1.z.string().optional(),
        companySize: zod_1.z
            .enum([...Object.values(client_1.CompanySize)], {})
            .optional(),
        tin: zod_1.z.string().optional(),
        tradeLicenseNumber: zod_1.z.string().optional(),
        companyLogo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        recruiterName: zod_1.z.string().optional(),
        recruiterDesignation: zod_1.z.string().optional(),
        recruiterNumber: zod_1.z.string().optional(),
    }),
});
exports.EmployeeValidation = {
    create,
    update,
};
