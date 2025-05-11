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
exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const task_service_1 = require("../services/task.service");
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, columnId, priority, assignedTo } = req.body;
        const task = yield (0, task_service_1.createTaskService)({
            title,
            description,
            columnId,
            priority,
            assignedTo,
            userId: req.user._id
        });
        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.createTask = createTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const task = yield (0, task_service_1.updateTaskService)(id, req.user._id, updateData);
        res.json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, task_service_1.deleteTaskService)(id, req.user._id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTask = deleteTask;
