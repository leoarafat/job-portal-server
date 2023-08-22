import { Job } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (payload: Job) => {
  //   console.log(payload.employeeId);
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

export const JobService = {
  insertIntoDB,
};
