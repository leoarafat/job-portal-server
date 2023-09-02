// Import necessary modules
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { prisma } from '../../../shared/prisma';
import { ILoginUser } from './auth.interface';

//! Login Candidate
const loginCandidate = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const candidate = await prisma.candidate.findUnique({
    where: { email },
    select: {
      name: true,
      email: true,
      id: true,
      password: true,
      role: true,
    },
  });

  if (!candidate) {
    throw new Error('candidate not found');
  }

  const isPasswordMatched = await bcrypt.compare(password, candidate.password);

  if (!isPasswordMatched) {
    throw new Error('Incorrect password');
  }

  // Generate access token
  const accessToken = jwt.sign(
    { email: candidate.email, role: candidate.role },
    process.env.JWT_SECRET as Secret,
    { expiresIn: '1h' }
  );

  // Generate refresh token
  const refreshToken = jwt.sign(
    { email: candidate.email, role: candidate.role },
    process.env.JWT_REFRESH_SECRET as Secret,
    { expiresIn: '7d' }
  );

  return {
    accessToken,
    refreshToken,
    candidate,
  };
};
//! Login Employee
const loginEmployee = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const employee = await prisma.employee.findUnique({
    where: { email },
    select: {
      name: true,
      email: true,
      id: true,
      password: true,
      role: true,
    },
  });

  if (!employee) {
    throw new Error('employee not found');
  }

  const isPasswordMatched = await bcrypt.compare(password, employee.password);

  if (!isPasswordMatched) {
    throw new Error('Incorrect password');
  }

  // Generate access token
  const accessToken = jwt.sign(
    { email: employee.email, role: employee.role },
    process.env.JWT_SECRET as Secret,
    { expiresIn: '1h' }
  );

  // Generate refresh token
  const refreshToken = jwt.sign(
    { email: employee.email, role: employee.role },
    process.env.JWT_REFRESH_SECRET as Secret,
    { expiresIn: '7d' }
  );

  return {
    accessToken,
    refreshToken,
    employee,
  };
};

export const AuthService = {
  loginCandidate,
  loginEmployee,
};
