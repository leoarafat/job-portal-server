import { Job, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { jobSearchableFields } from './job.constants';
import { IJobFilterRequest } from './job.interface';

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

const getAllFromDB = async (
  filters: IJobFilterRequest,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Job[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  //!searching
  if (searchTerm) {
    andConditions.push({
      OR: jobSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  //!filtering
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }
  //!where conditions
  const whereConditions: Prisma.JobWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.job.findMany({
    include: {
      employee: true,
    },
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
  const total = await prisma.job.count({ where: whereConditions });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
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
