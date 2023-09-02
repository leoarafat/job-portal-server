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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const cloudinaryConfig_1 = __importDefault(require("../../../config/cloudinaryConfig"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = require("../../../shared/prisma");
//!Create employee
const createEmployee = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.prisma.employee.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already exist this email');
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
    const result = yield prisma_1.prisma.employee.create({
        data: Object.assign(Object.assign({}, payload), { password: hashedPassword }),
    });
    if (!result) {
        throw new ApiError_1.default(404, 'Something Went wrong');
    }
    return result;
});
//!Get All employee
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.employee.findMany();
    return result;
});
//!Get employee by id
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.employee.findUnique({
        where: {
            id,
        },
    });
    return result;
});
//!Update with photo
const updateEmployeeProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    if (payload.photoUrl) {
        const uploadedImage = yield cloudinaryConfig_1.default.uploader.upload(payload.photoUrl);
        payload.photoUrl = uploadedImage.secure_url;
    }
    delete payload.photoUrl;
    payload.isComplete = true;
    const result = yield prisma_1.prisma.employee.update({
        where: { id },
        data: payload,
    });
    return result;
});
//!Delete employee
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.employee.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.EmployeeService = {
    createEmployee,
    getAllFromDB,
    getByIdFromDB,
    updateEmployeeProfile,
    deleteEmployee,
};
