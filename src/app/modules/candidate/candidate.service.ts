import { Candidate } from '@prisma/client';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const createCandidate = async (payload: Candidate): Promise<Candidate> => {
  if (!payload) {
    throw new ApiError(404, 'Something Went wrong');
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const result = await prisma.candidate.create({
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

const getAllFromDB = async (): Promise<Candidate[]> => {
  const result = await prisma.candidate.findMany();

  return result;
};
const getByIdFromDB = async (id: string): Promise<Candidate | null> => {
  const result = await prisma.candidate.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateCandidateProfile = async (
  id: string,
  payload: Partial<Candidate>
) => {
  const result = await prisma.candidate.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteCandidate = async (id: string): Promise<Candidate> => {
  const result = await prisma.candidate.delete({
    where: {
      id,
    },
  });
  return result;
};
export const CandidateService = {
  createCandidate,
  getAllFromDB,
  getByIdFromDB,
  updateCandidateProfile,
  deleteCandidate,
};
