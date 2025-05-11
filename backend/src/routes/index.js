"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const board_routes_1 = __importDefault(require("./board.routes"));
const column_routes_1 = __importDefault(require("./column.routes"));
const task_routes_1 = __importDefault(require("./task.routes"));
const router = (0, express_1.Router)();
//Auth
router.use("/auth", auth_routes_1.default);
// Board 
router.use("/board", board_routes_1.default);
//Column 
router.use("/column", column_routes_1.default);
//Tasks
router.use("/task", task_routes_1.default);
exports.default = router;
