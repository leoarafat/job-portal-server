import express from 'express';

import { CandidateRoutes } from '../modules/candidate/candidate.routes';
import { employeeRoutes } from '../modules/employee/employee.routes';
import { JobRoutes } from '../modules/job/job.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    routes: CandidateRoutes,
  },
  {
    path: '/employee',
    routes: employeeRoutes,
  },
  {
    path: '/job',
    routes: JobRoutes,
  },
  // {
  //   path: '/login',
  //   routes: UserRoutes,
  // },
  // {
  //   path: '/refresh-token',
  //   routes: UserRoutes,
  // },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
