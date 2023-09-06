"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const job_constants_1 = require("./job.constants");
//!create job
const insertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmployee = yield prisma_1.prisma.employee.findUnique({
        where: {
            id: payload.employeeId,
        },
    });
    if (!existingEmployee) {
        throw new Error(`Employee with ID ${payload.employeeId} does not exist.`);
    }
    if (existingEmployee.role === 'Employee') {
        const result = yield prisma_1.prisma.job.create({
            data: payload,
            include: {
                employee: true,
            },
        });
        return result;
    }
    else {
        throw new ApiError_1.default(404, 'Employee dose not exist');
    }
});
//! get all job
const getAllFromDB = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    //*searching
    if (searchTerm) {
        andConditions.push({
            OR: job_constants_1.jobSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    //*filtering
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    //*where conditions
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.prisma.job.findMany({
        include: {
            employee: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : { createdAt: 'desc' },
    });
    const total = yield prisma_1.prisma.job.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
//! get job by id
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.job.findUnique({
        where: {
            id,
        },
        include: {
            employee: true,
        },
    });
    return result;
});
//! get previous job
const getPreviousJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.job.findMany({
        where: {
            employeeId: id,
        },
        include: {
            employee: true,
        },
    });
    return result;
});
//! update job
const updateJob = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.job.update({
        where: {
            id,
        },
        data: payload,
        include: {
            employee: true,
        },
    });
    return result;
});
//! delete job
const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.job.delete({
        where: {
            id,
        },
        include: {
            employee: true,
        },
    });
    return result;
});
//! Apply job
const applyJob = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const candidateId = payload === null || payload === void 0 ? void 0 : payload.candidateId;
    const jobId = payload.jobId;
    const existingApplication = yield prisma_1.prisma.application.findFirst({
        where: {
            candidateId: candidateId,
            jobId: jobId,
        },
    });
    if (existingApplication) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Already applied to this job.');
    }
    const result = yield prisma_1.prisma.application.create({
        data: payload,
        include: {
            candidate: true,
            job: true,
        },
    });
    return result;
});
//! My job list
const myJob = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.application.findMany({
        where: {
            candidateId: payload.id,
        },
        include: {
            candidate: true,
            job: true,
        },
    });
    return result;
});
//!Job save list
const saveJob = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const candidateId = payload === null || payload === void 0 ? void 0 : payload.candidateId;
    const jobId = payload.jobId;
    const existingApplication = yield prisma_1.prisma.savedJob.findFirst({
        where: {
            candidateId: candidateId,
            jobId: jobId,
        },
    });
    if (existingApplication) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Already saved this job.');
    }
    const result = yield prisma_1.prisma.savedJob.create({
        data: payload,
        include: {
            candidate: true,
            job: true,
        },
    });
    return result;
});
//! Get save job
const getSavedJob = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.savedJob.findMany({
        where: {
            candidateId: payload.candidateId,
        },
        include: {
            candidate: true,
            job: true,
        },
    });
    return result;
});
//! delete saved job
const deleteSavedJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.savedJob.delete({
        where: {
            id: id,
        },
    });
    return result;
});
//! Added Comment
const addedComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.comment.create({
        data: payload,
    });
    return result;
});
const getAllJobPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.job.findMany({
        take: 10,
    });
    return result;
});
exports.JobService = {
    insertIntoDB,
    getAllFromDB,
    getById,
    updateJob,
    deleteJob,
    applyJob,
    myJob,
    saveJob,
    getSavedJob,
    addedComment,
    getPreviousJob,
    deleteSavedJob,
    getAllJobPosts,
};
