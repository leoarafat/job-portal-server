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
router.get('/:id', JobController.getById);
router.patch(
  '/:id',
  validateRequest(JobValidation.update),
  JobController.updateJob
);
router.delete('/:id', JobController.deleteJob);
export const JobRoutes = router;
