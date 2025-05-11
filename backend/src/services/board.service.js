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
exports.createDefaultBoard = exports.getBoardWithColumnsAndTasks = void 0;
const board_1 = __importDefault(require("../models/board"));
const column_1 = __importDefault(require("../models/column"));
const task_1 = __importDefault(require("../models/task"));
const apiError_1 = require("../utils/apiError");
const getBoardWithColumnsAndTasks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const board = yield board_1.default.findOne({ user: userId })
        .populate({
        path: 'columns',
        populate: {
            path: 'tasks',
            model: task_1.default
        }
    });
    if (!board) {
        throw new apiError_1.ApiError(404, "Board not found");
    }
    return board;
});
exports.getBoardWithColumnsAndTasks = getBoardWithColumnsAndTasks;
// It will create the default board when the user registers.
const createDefaultBoard = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const board = yield board_1.default.create({
        title: "My Board",
        user: userId
    });
    const defaultColumns = [
        { title: "To Do", position: 0 },
        { title: "In Progress", position: 1 },
        { title: "Done", position: 2 }
    ];
    const columns = yield Promise.all(defaultColumns.map(col => column_1.default.create(Object.assign(Object.assign({}, col), { board: board._id }))));
    // Update board with column references
    board.columns = columns.map(col => col._id);
    yield board.save();
    return board;
});
exports.createDefaultBoard = createDefaultBoard;
