"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.auth); // Protect all task routes
router.post("/", task_controller_1.createTask);
router.patch("/:id", task_controller_1.updateTask);
router.delete("/:id", task_controller_1.deleteTask);
exports.default = router;
