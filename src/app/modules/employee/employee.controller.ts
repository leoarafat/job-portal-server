import { Employee } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { EmployeeService } from './employee.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.createEmployee(req.body);
  sendResponse<Employee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.getAllFromDB();
  sendResponse<Employee[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee retrieved successfully',
    data: result,
  });
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeeService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee fetched successfully',
    data: result,
  });
});
const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await EmployeeService.updateEmployeeProfile(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee updated successfully',
    data: result,
  });
});
const deleteEmployee = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeeService.deleteEmployee(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee deleted successfully',
    data: result,
  });
});
export const EmployeeController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateEmployee,
  deleteEmployee,
};
