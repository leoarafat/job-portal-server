"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// Import necessary modules
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../../shared/prisma");
//! Login Candidate
const loginCandidate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const candidate = yield prisma_1.prisma.candidate.findUnique({
        where: { email },
        select: {
            name: true,
            email: true,
            id: true,
            password: true,
            role: true,
        },
    });
    if (!candidate) {
        throw new Error('candidate not found');
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, candidate.password);
    if (!isPasswordMatched) {
        throw new Error('Incorrect password');
    }
    // Generate access token
    const accessToken = jsonwebtoken_1.default.sign({ email: candidate.email, role: candidate.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Generate refresh token
    const refreshToken = jsonwebtoken_1.default.sign({ email: candidate.email, role: candidate.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return {
        accessToken,
        refreshToken,
        candidate,
    };
});
//! Login Employee
const loginEmployee = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const employee = yield prisma_1.prisma.employee.findUnique({
        where: { email },
        select: {
            name: true,
            email: true,
            id: true,
            password: true,
            role: true,
        },
    });
    if (!employee) {
        throw new Error('employee not found');
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, employee.password);
    if (!isPasswordMatched) {
        throw new Error('Incorrect password');
    }
    // Generate access token
    const accessToken = jsonwebtoken_1.default.sign({ email: employee.email, role: employee.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Generate refresh token
    const refreshToken = jsonwebtoken_1.default.sign({ email: employee.email, role: employee.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return {
        accessToken,
        refreshToken,
        employee,
    };
});
exports.AuthService = {
    loginCandidate,
    loginEmployee,
};
