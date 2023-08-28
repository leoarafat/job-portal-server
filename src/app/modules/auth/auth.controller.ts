import { Request, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import { AuthService } from './auth.service';

//! Login Candidate
const loginCandidate = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginCandidate(loginData);
  console.log(result);
  const { refreshToken, candidate } = result;
  console.log(candidate);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Candidate loggedin successfully !',
    data: candidate,
  });
});
//! Login Employee
const loginEmployee = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginEmployee(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Employee loggedin successfully !',
    data: others,
  });
});

export const AuthController = {
  loginCandidate,
  loginEmployee,
};
