import { Application, Job, SavedJob } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { jobFilterableFields } from './job.constants';
import { JobService } from './job.service';

//!Create Job
const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.insertIntoDB(req.body);
  sendResponse<Job>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job created successfully',
    data: result,
  });
});
//!Get All Job
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
//!Get Job by id
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
//!Get Previous job
const getPreviousJob = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await JobService.getPreviousJob(id);
  sendResponse<Job[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job post retrieved successfully',
    data: result,
  });
});
//!Update Job
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
//!Delete Job
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
//!Apply for Job
const applyJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.applyJob(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Applied Job',
    data: result,
  });
});
//!Get my applied Job
const myJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.myJob(req.body);
  sendResponse<Application[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My application retrieved successfully',
    data: result,
  });
});
//!Save Job post
const savedJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.saveJob(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job Saved',
    data: result,
  });
});
//!Get saved Job
const getSavedJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.getSavedJob(req.body);
  sendResponse<SavedJob[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Saved job retrieved successfully',
    data: result,
  });
});
//!Delete saved Job
const deleteSavedJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.deleteSavedJob(req.params.id);
  sendResponse<SavedJob>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Saved job delete successfully',
    data: result,
  });
});
//!Comment a Job
const addedComment = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.addedComment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment added',
    data: result,
  });
});
const getAllJobPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.getAllJobPosts();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post retrieved successful',
    data: result,
  });
});
export const JobController = {
  insertIntoDb,
  getAllFromDB,
  getById,
  updateJob,
  deleteJob,
  applyJob,
  myJob,
  savedJob,
  getSavedJob,
  addedComment,
  getPreviousJob,
  deleteSavedJob,
  getAllJobPosts,
};
