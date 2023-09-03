import { Candidate } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CandidateService } from './candidate.service';
//!Create Candidate
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CandidateService.createCandidate(req.body);
  sendResponse<Candidate>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate created successfully',
    data: result,
  });
});
//!Get Candidate
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CandidateService.getAllFromDB();
  sendResponse<Candidate[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate retrieved successfully',
    data: result,
  });
});
//!Get by id Candidate
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CandidateService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate fetched successfully',
    data: result,
  });
});
//!update Candidate
const updateCandidate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(req);
  const result = await CandidateService.updateCandidateProfile(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate updated successfully',
    data: result,
  });
});
//!Delete Candidate
const deleteCandidate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CandidateService.deleteCandidate(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Candidate deleted successfully',
    data: result,
  });
});
export const CandidateController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateCandidate,
  deleteCandidate,
};
