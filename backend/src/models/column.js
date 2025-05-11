"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ColumnSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    tasks: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Task" }],
});
exports.default = mongoose_1.default.model("Column", ColumnSchema);
