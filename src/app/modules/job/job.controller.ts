import { Application, Job, SavedJob } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { jobFilterableFields } from './job.constants';
import { JobService } from './job.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.insertIntoDB(req.body);
  sendResponse<Job>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job created successfully',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, jobFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await JobService.getAllFromDB(filters, paginationOptions);
  sendResponse<Job[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job post retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await JobService.getById(id);
  sendResponse<Job>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job post retrieved successfully',
    data: result,
  });
});
const updateJob = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await JobService.updateJob(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job post updated successfully',
    data: result,
  });
});
const deleteJob = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await JobService.deleteJob(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job deleted successfully',
    data: result,
  });
});

const applyJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.applyJob(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Applied Job',
    data: result,
  });
});
const myJob = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await JobService.myJob(id);
  sendResponse<Application>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My application retrieved successfully',
    data: result,
  });
});
const savedJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.saveJob(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job Saved',
    data: result,
  });
});
const getSavedJob = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await JobService.getSavedJob(id);
  sendResponse<SavedJob>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My application retrieved successfully',
    data: result,
  });
});
export const JobController = {
  insertIntoDB,
  getAllFromDB,
  getById,
  updateJob,
  deleteJob,
  applyJob,
  myJob,
  savedJob,
  getSavedJob,
};
