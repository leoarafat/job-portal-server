import express from 'express';
import { JobController } from './job.controller';
const router = express.Router();
router.post('/', JobController.insertIntoDB);
export const JobRoutes = router;
