"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const candidate_routes_1 = require("../modules/candidate/candidate.routes");
const course_routes_1 = require("../modules/courses/course.routes");
const employee_routes_1 = require("../modules/employee/employee.routes");
const job_routes_1 = require("../modules/job/job.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/candidate',
        routes: candidate_routes_1.CandidateRoutes,
    },
    {
        path: '/employee',
        routes: employee_routes_1.employeeRoutes,
    },
    {
        path: '/jobs',
        routes: job_routes_1.JobRoutes,
    },
    {
        path: '/courses',
        routes: course_routes_1.CourseRoutes,
    },
    {
        path: '/auth',
        routes: auth_routes_1.AuthRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
