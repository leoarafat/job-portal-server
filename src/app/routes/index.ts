import express from 'express';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    routes: 
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
