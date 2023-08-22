import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EmployeeController } from './employee.controller';
import { EmployeeValidation } from './employee.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(EmployeeValidation.create),
  EmployeeController.insertIntoDB
);
router.get('', EmployeeController.getAllFromDB);
router.get('/:id', EmployeeController.getByIdFromDB);
router.patch(
  '/:id',
  validateRequest(EmployeeValidation.update),
  EmployeeController.updateEmployee
);
router.delete(
  '/:id',

  EmployeeController.deleteEmployee
);

export const employeeRoutes = router;
