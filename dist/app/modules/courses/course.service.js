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
exports.CourseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
//@ts-ignore
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const course_constants_1 = require("./course.constants");
const course_utils_1 = require("./course.utils");
//!create Course
const insertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.courses.create({
        data: payload,
    });
    return result;
});
//! get all Course
const getAllFromDB = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    //*searching
    if (searchTerm) {
        andConditions.push({
            OR: course_constants_1.courseSearchableFields.map(field => ({
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
    const result = yield prisma_1.prisma.courses.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : { createdAt: 'desc' },
    });
    const total = yield prisma_1.prisma.courses.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
//! get Course by id
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.courses.findUnique({
        where: {
            id,
        },
    });
    return result;
});
//! update Course
const updateCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.courses.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
//! delete Course
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.courses.delete({
        where: {
            id,
        },
    });
    return result;
});
const orderCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tran_id = (0, course_utils_1.generateRandomUUID)();
    console.log(payload);
    const isExist = yield prisma_1.prisma.orders.findFirst({
        where: {
            courseId: payload.id,
            buyerId: (_a = payload === null || payload === void 0 ? void 0 : payload.user) === null || _a === void 0 ? void 0 : _a.id,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already enrolled this course');
    }
    const data = {
        total_amount: payload.price,
        currency: 'BDT',
        tran_id: tran_id,
        success_url: `https://job-box-two.vercel.app/api/v1/courses/payment/success?transactionId=${tran_id}`,
        fail_url: `https://job-box-two.vercel.app/orders/payment/fail?transactionId=${tran_id}`,
        cancel_url: `https://job-box-two.vercel.app/orders/payment/cancel?transactionId=${tran_id}`,
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: payload.title,
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: payload.user.name,
        cus_email: payload.user.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new sslcommerz_lts_1.default(process.env.STORE_ID, process.env.STORE_PASSWORD, course_utils_1.is_live);
    const apiResponse = yield sslcz.init(data);
    // Redirect the user to the payment gateway
    const GatewayPageURL = apiResponse.GatewayPageURL;
    // Create the order
    yield prisma_1.prisma.orders.create({
        data: {
            transactionId: tran_id,
            buyerName: payload.user.name,
            buyerEmail: payload.user.email,
            buyerId: payload.user.id,
            courseId: payload.id,
            courseName: payload.title,
            price: payload.price,
            paid: false,
        },
    });
    return { url: GatewayPageURL };
});
const orderCourseSuccess = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = payload;
    if (!transactionId) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order Not Found');
    }
    const result = yield prisma_1.prisma.orders.update({
        where: {
            transactionId: transactionId,
        },
        data: {
            paid: true,
        },
    });
    if (result) {
        return result;
    }
    return transactionId;
});
const orderCourseFailed = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.courses.delete({
        where: {
            id,
        },
    });
    return result;
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.orders.findMany({
        where: {
            buyerId: id,
        },
    });
    return result;
});
exports.CourseService = {
    insertIntoDB,
    getAllFromDB,
    getById,
    updateCourse,
    deleteCourse,
    orderCourse,
    orderCourseSuccess,
    orderCourseFailed,
    getOrderById,
};
