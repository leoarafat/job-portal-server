import { Courses } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseFilterableFields } from './course.constants';
import { CourseService } from './course.service';

//!Create Course
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.insertIntoDB(req.body);
  sendResponse<Courses>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});
//!Get All Course
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, courseFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CourseService.getAllFromDB(filters, paginationOptions);
  sendResponse<Courses[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
//!Get Course by id
const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.getById(id);
  sendResponse<Courses>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrieved successfully',
    data: result,
  });
});
//!Update Course
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.updateCourse(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course  updated successfully',
    data: result,
  });
});
//!Delete Course
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.deleteCourse(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});
//!Order Course
const orderCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.orderCourse(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ordered successfully',
    data: result,
  });
});
//!Order Success
const orderCourseSuccess = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.orderCourseSuccess(req.query);

  if (result) {
    return res.redirect(
      `https://pro-careers.vercel.app/payment/success?transactionId=${result?.transactionId}`
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});
//!Order Failed
const orderCourseFailed = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.orderCourseFailed(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Failed',
    data: result,
  });
});
//!Order get
const getOrderById = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id, 'params id');
  const result = await CourseService.getOrderById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfull',
    data: result,
  });
});
export const CourseController = {
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
