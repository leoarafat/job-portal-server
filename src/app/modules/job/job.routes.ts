import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { JobController } from './job.controller';
import { JobValidation } from './job.validation';
const router = express.Router();
router.post(
  '/',
  validateRequest(JobValidation.create),
  JobController.insertIntoDb
);
router.post('/', JobController.addedComment);
router.post(
  '/apply',
  validateRequest(JobValidation.apply),
  JobController.applyJob
);
router.post(
  '/save-job',
  validateRequest(JobValidation.save),
  JobController.savedJob
);
router.get('/', JobController.getAllFromDB);
router.get('/all-posts', JobController.getAllJobPosts);
router.get('/:id', JobController.getById);
router.get('/previous-jobs/:id', JobController.getPreviousJob);
router.get('/my-application/:id', JobController.myJob);
router.get('/saved-job/:id', JobController.getSavedJob);
router.patch(
  '/:id',
  validateRequest(JobValidation.update),
  JobController.updateJob
);
router.delete('/:id', JobController.deleteJob);
router.delete('/saved-job/:id', JobController.deleteSavedJob);
export const JobRoutes = router;
