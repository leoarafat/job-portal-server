import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CandidateRoutes } from '../modules/candidate/candidate.routes';
import { CourseRoutes } from '../modules/courses/course.routes';
import { employeeRoutes } from '../modules/employee/employee.routes';
import { JobRoutes } from '../modules/job/job.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/candidate',
    routes: CandidateRoutes,
  },
  {
    path: '/employee',
    routes: employeeRoutes,
  },
  {
    path: '/jobs',
    routes: JobRoutes,
  },
  {
    path: '/courses',
    routes: CourseRoutes,
  },
  {
    path: '/auth',
    routes: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
