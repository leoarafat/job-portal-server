import { Employee } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import cloudinary from '../../../config/cloudinaryConfig';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

//!Create employee
const createEmployee = async (payload: Employee): Promise<Employee> => {
  const isExist = await prisma.employee.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already exist this email');
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const result = await prisma.employee.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  if (!result) {
    throw new ApiError(404, 'Something Went wrong');
  }

  return result;
};
//!Get All employee
const getAllFromDB = async (): Promise<Employee[]> => {
  const result = await prisma.employee.findMany();

  return result;
};
//!Get employee by id
const getByIdFromDB = async (id: string): Promise<Employee | null> => {
  const result = await prisma.employee.findUnique({
    where: {
      id,
    },
  });
  return result;
};

//!Update with photo
const updateEmployeeProfile = async (
  id: string,
  payload: Partial<Employee>
) => {
  console.log(payload);
  if (payload.photoUrl) {
    const uploadedImage = await cloudinary.uploader.upload(payload.photoUrl);
    payload.photoUrl = uploadedImage.secure_url;
  }
  delete payload.photoUrl;
  payload.isComplete = true;
  const result = await prisma.employee.update({
    where: { id },
    data: payload,
  });
  return result;
};
//!Delete employee
const deleteEmployee = async (id: string): Promise<Employee> => {
  const result = await prisma.employee.delete({
    where: {
      id,
    },
  });
  return result;
};
export const EmployeeService = {
  createEmployee,
  getAllFromDB,
  getByIdFromDB,
  updateEmployeeProfile,
  deleteEmployee,
};
