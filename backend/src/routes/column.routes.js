"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const column_controller_1 = require("../controllers/column.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.auth);
router.post("/", column_controller_1.addColumn);
exports.default = router;
