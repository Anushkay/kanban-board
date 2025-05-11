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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addColumn = void 0;
const column_service_1 = require("../services/column.service");
const board_service_1 = require("../services/board.service");
const apiError_1 = require("../utils/apiError");
const addColumn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        if (!title) {
            throw new apiError_1.ApiError(400, "Title is required");
        }
        let board = yield (0, board_service_1.getBoardWithColumnsAndTasks)(req.user._id);
        if (!board) {
            board = yield (0, board_service_1.createDefaultBoard)(req.user._id);
        }
        const column = yield (0, column_service_1.createColumn)(board._id.toString(), title);
        res.status(201).json(column);
    }
    catch (error) {
        next(error);
    }
});
exports.addColumn = addColumn;
