import { Employee } from '@prisma/client';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const createEmployee = async (payload: Employee): Promise<Employee> => {
  if (!payload) {
    throw new ApiError(404, 'Something Went wrong');
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

const getAllFromDB = async (): Promise<Employee[]> => {
  const result = await prisma.employee.findMany();

  return result;
};
const getByIdFromDB = async (id: string): Promise<Employee | null> => {
  const result = await prisma.employee.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateEmployeeProfile = async (
  id: string,
  payload: Partial<Employee>
) => {
  const result = await prisma.employee.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
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
