"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const board_controller_1 = require("../controllers/board.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.auth);
router.get("/", board_controller_1.getBoard);
exports.default = router;
