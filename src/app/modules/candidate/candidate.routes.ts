import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CandidateController } from './candidate.controller';
import { CandidateValidation } from './candidate.validation';
const router = express.Router();

router.post(
  '/candidate',
  validateRequest(CandidateValidation.create),
  CandidateController.insertIntoDB
);
router.get('/candidate/', CandidateController.getAllFromDB);
router.get('/candidate/:id', CandidateController.getByIdFromDB);
router.patch(
  '/candidate/:id',
  validateRequest(CandidateValidation.update),
  CandidateController.updateCandidate
);
router.delete(
  '/candidate/:id',

  CandidateController.deleteCandidate
);

export const CandidateRoutes = router;
