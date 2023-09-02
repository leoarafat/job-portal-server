import { Candidate } from '@prisma/client';
import bcrypt from 'bcrypt';

import httpStatus from 'http-status';
import cloudinary from '../../../config/cloudinaryConfig';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';
//!Create Candidate
const createCandidate = async (payload: Candidate): Promise<Candidate> => {
  const isExist = await prisma.candidate.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already exist this email');
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
//!Get All Candidate
const getAllFromDB = async (): Promise<Candidate[]> => {
  const result = await prisma.candidate.findMany();

  return result;
};
//!Get Candidate by id
const getByIdFromDB = async (id: string): Promise<Candidate | null> => {
  const result = await prisma.candidate.findUnique({
    where: {
      id,
    },
  });
  return result;
};

//!Update with photo
const updateCandidateProfile = async (
  id: string,
  payload: Partial<Candidate>
) => {
  if (payload.photoUrl) {
    const uploadedImage = await cloudinary.uploader.upload(payload.photoUrl);

    payload.photoUrl = uploadedImage.secure_url;
  }
  delete payload.photoUrl;
  payload.isComplete = true;
  const result = await prisma.candidate.update({
    where: { id },
    data: payload,
  });

  return result;
};
//!Delete Candidate
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
