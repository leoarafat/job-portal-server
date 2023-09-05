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
router.post('/order', CourseController.orderCourse);
router.post('/payment/success', CourseController.orderCourseSuccess);
router.post('/payment/fail', CourseController.orderCourseFailed);
router.get('/', CourseController.getAllFromDB);

router.get('/:id', CourseController.getOrderById);
router.delete('/:id', CourseController.deleteCourse);
router.get('/:id', CourseController.getById);
router.patch(
  '/:id',
  validateRequest(CourseValidation.update),
  CourseController.updateCourse
);

export const CourseRoutes = router;
