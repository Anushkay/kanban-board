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
exports.createColumn = void 0;
const column_1 = __importDefault(require("../models/column"));
const board_1 = __importDefault(require("../models/board"));
const createColumn = (boardId, title) => __awaiter(void 0, void 0, void 0, function* () {
    const column = yield column_1.default.create({ title, board: boardId });
    yield board_1.default.findByIdAndUpdate(boardId, { $push: { columns: column._id } }, { new: true });
    return column;
});
exports.createColumn = createColumn;
