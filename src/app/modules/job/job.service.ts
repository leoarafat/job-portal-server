import { Job } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (payload: Job) => {
  const existingEmployee = await prisma.employee.findUnique({
    where: {
      id: payload.employeeId,
    },
  });

  if (!existingEmployee) {
    throw new Error(`Employee with ID ${payload.employeeId} does not exist.`);
  }

  if (existingEmployee.role === 'Employee') {
    const result = await prisma.job.create({
      data: payload,
      include: {
        employee: true,
      },
    });
    return result;
  } else {
    throw new ApiError(404, 'Employee dose not exist');
  }
};
const getAllFromDB = async (): Promise<Job[]> => {
  const result = await prisma.job.findMany({
    include: {
      employee: true,
    },
  });
  return result;
};
const getById = async (id: string): Promise<Job | null> => {
  const result = await prisma.job.findUnique({
    where: {
      id,
    },
    include: {
      employee: true,
    },
  });
  return result;
};
const updateJob = async (id: string, payload: Partial<Job>): Promise<Job> => {
  const result = await prisma.job.update({
    where: {
      id,
    },
    data: payload,
    include: {
      employee: true,
    },
  });
  return result;
};

const deleteJob = async (id: string): Promise<Job> => {
  const result = await prisma.job.delete({
    where: {
      id,
    },
    include: {
      employee: true,
    },
  });
  return result;
};

export const JobService = {
  insertIntoDB,
  getAllFromDB,
  getById,
  updateJob,
  deleteJob,
};
