/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Courses, Orders, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
//@ts-ignore
import SSLCommerzPayment from 'sslcommerz-lts';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { courseSearchableFields } from './course.constants';
import { ICourseFilterRequest } from './course.interface';
import { generateRandomUUID, is_live } from './course.utils';
//!create Course
const insertIntoDB = async (payload: Courses) => {
  const result = await prisma.courses.create({
    data: payload,
  });
  return result;
};
//! get all Course
const getAllFromDB = async (
  filters: ICourseFilterRequest,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Courses[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  //*searching
  if (searchTerm) {
    andConditions.push({
      OR: courseSearchableFields.map(field => ({
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
          equals: (filtersData as any)[key],
        },
      })),
    });
  }
  //*where conditions
  const whereConditions: Prisma.CoursesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.courses.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: 'desc' },
  });
  const total = await prisma.courses.count({ where: whereConditions });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
//! get Course by id
const getById = async (id: string): Promise<Courses | null> => {
  const result = await prisma.courses.findUnique({
    where: {
      id,
    },
  });
  return result;
};
//! update Course
const updateCourse = async (
  id: string,
  payload: Partial<Courses>
): Promise<Courses> => {
  const result = await prisma.courses.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
//! delete Course
const deleteCourse = async (id: string): Promise<Courses> => {
  const result = await prisma.courses.delete({
    where: {
      id,
    },
  });
  return result;
};

const orderCourse = async (payload: any) => {
  const tran_id = generateRandomUUID();
  console.log(payload);
  const isExist = await prisma.orders.findFirst({
    where: {
      courseId: payload.id,
      buyerId: payload?.user?.id,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already enrolled this course');
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

  const sslcz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    is_live
  );

  const apiResponse = await sslcz.init(data);
  // Redirect the user to the payment gateway
  const GatewayPageURL = apiResponse.GatewayPageURL;

  // Create the order
  await prisma.orders.create({
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
};

const orderCourseSuccess = async (payload: any): Promise<any> => {
  const { transactionId } = payload;

  if (!transactionId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Found');
  }
  const result = await prisma.orders.update({
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
};
const orderCourseFailed = async (id: string): Promise<Courses> => {
  const result = await prisma.courses.delete({
    where: {
      id,
    },
  });
  return result;
};
const getOrderById = async (id: string): Promise<Orders[]> => {
  const result = await prisma.orders.findMany({
    where: {
      buyerId: id,
    },
  });
  return result;
};
export const CourseService = {
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
