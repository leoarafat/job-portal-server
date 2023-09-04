"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required',
        }),
        description: zod_1.z.string({
            required_error: 'description is required',
        }),
        photoUrl: zod_1.z.string({
            required_error: 'photoUrl is required',
        }),
        owner: zod_1.z.string({
            required_error: 'Owner is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        photoUrl: zod_1.z.string().optional(),
        owner: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
    }),
});
exports.CourseValidation = {
    create,
    update,
};
