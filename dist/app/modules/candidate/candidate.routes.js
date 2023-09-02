"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const candidate_controller_1 = require("./candidate.controller");
const candidate_validation_1 = require("./candidate.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(candidate_validation_1.CandidateValidation.create), candidate_controller_1.CandidateController.insertIntoDB);
router.get('/', candidate_controller_1.CandidateController.getAllFromDB);
router.get('/:id', candidate_controller_1.CandidateController.getByIdFromDB);
router.patch('/:id', (0, validateRequest_1.default)(candidate_validation_1.CandidateValidation.update), candidate_controller_1.CandidateController.updateCandidate);
router.delete('/:id', candidate_controller_1.CandidateController.deleteCandidate);
exports.CandidateRoutes = router;
