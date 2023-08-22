import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { JobController } from './job.controller';
import { JobValidation } from './job.validation';
const router = express.Router();
router.post(
  '/',
  validateRequest(JobValidation.create),
  JobController.insertIntoDB
);
router.get('/', JobController.getAllFromDB);
export const JobRoutes = router;
