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
exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const apiError_1 = require("../utils/apiError");
const http_status_1 = __importDefault(require("http-status"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const board_service_1 = require("./board.service");
const registerUser = (email, password, firstName, lastName) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_1.default.findOne({ email })) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, "Email already taken");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    const user = yield user_1.default.create({ email, password: hashedPassword, firstName, lastName });
    const board = yield (0, board_service_1.createDefaultBoard)(user._id);
    return {
        user: {
            id: user._id.toString(),
            email: user.email,
            boardId: board._id,
        },
        token: (0, jwt_1.generateToken)(user._id.toString())
    };
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email }).lean();
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        throw new apiError_1.ApiError(http_status_1.default.UNAUTHORIZED, "Incorrect email or password");
    }
    return {
        user: {
            id: user._id.toString(),
            email: user.email
        },
        token: (0, jwt_1.generateToken)(user._id.toString())
    };
});
exports.loginUser = loginUser;
