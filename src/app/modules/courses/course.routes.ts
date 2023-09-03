import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validations';

const router = express.Router();
router.post(
  '/',
  validateRequest(CourseValidation.create),
  CourseController.insertIntoDB
);
router.get('/', CourseController.getAllFromDB);
router.get('/:id', CourseController.getById);
router.get('/:id', CourseController.deleteCourse);
router.get(
  '/:id',
  validateRequest(CourseValidation.update),
  CourseController.updateCourse
);

export const CourseRoutes = router;
