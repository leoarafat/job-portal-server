import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../../../shared/prisma';
export const insertIntoDB = async (payload: User): Promise<User> => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });
  return result;
};

export const UserService = {
  insertIntoDB,
};
