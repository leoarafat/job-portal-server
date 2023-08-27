import { Courses, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { courseSearchableFields } from './course.constants';
import { ICourseFilterRequest } from './course.interface';

//!create Course
const insertIntoDB = async (payload: Courses) => {
  const result = await prisma.courses.create({
    data: payload,
  });
  return result;
};
//! get all Course
const getAllFromDB = async (
  filters: ICourseFilterRequest,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Courses[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  //*searching
  if (searchTerm) {
    andConditions.push({
      OR: courseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  //*filtering
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }
  //*where conditions
  const whereConditions: Prisma.CoursesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.courses.findMany({
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
  const total = await prisma.courses.count({ where: whereConditions });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
//! get Course by id
const getById = async (id: string): Promise<Courses | null> => {
  const result = await prisma.courses.findUnique({
    where: {
      id,
    },
  });
  return result;
};
//! update Course
const updateCourse = async (
  id: string,
  payload: Partial<Courses>
): Promise<Courses> => {
  const result = await prisma.courses.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
//! delete Course
const deleteCourse = async (id: string): Promise<Courses> => {
  const result = await prisma.courses.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CourseService = {
  insertIntoDB,
  getAllFromDB,
  getById,
  updateCourse,
  deleteCourse,
};
