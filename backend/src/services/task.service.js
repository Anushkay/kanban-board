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
exports.deleteTaskService = exports.updateTaskService = exports.createTaskService = void 0;
const task_1 = __importDefault(require("../models/task"));
const column_1 = __importDefault(require("../models/column"));
const user_1 = __importDefault(require("../models/user"));
const apiError_1 = require("../utils/apiError");
const createTaskService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, description, columnId, priority = "Medium", assignedTo, userId }) {
    // Verify column exists and belongs to user
    const column = yield column_1.default.findOne({
        _id: columnId,
    });
    if (!column) {
        throw new apiError_1.ApiError(404, "Column not found or access denied");
    }
    // Verify assigned user exists if provided
    let assignedUser = null;
    if (assignedTo) {
        assignedUser = yield user_1.default.findById(assignedTo);
        if (!assignedUser) {
            throw new apiError_1.ApiError(404, "Assigned user not found");
        }
    }
    // Get highest position in column
    const highestPositionTask = yield task_1.default.findOne({ column: columnId })
        .sort("-position")
        .select("position")
        .lean();
    const position = highestPositionTask ? highestPositionTask.position + 1 : 0;
    const task = yield task_1.default.create({
        title,
        description,
        column: columnId,
        position,
        priority,
        assignedTo: assignedUser === null || assignedUser === void 0 ? void 0 : assignedUser._id
    });
    // Add task to column
    column.tasks.push(task._id);
    yield column.save();
    return task;
});
exports.createTaskService = createTaskService;
const updateTaskService = (taskId, userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_1.default.findOne({
        _id: taskId,
    });
    if (!task) {
        throw new apiError_1.ApiError(404, "Task not found or access denied");
    }
    // Handle assignment changes
    if (updateData.assignedTo !== undefined) {
        if (updateData.assignedTo) {
            const user = yield user_1.default.findById(updateData.assignedTo);
            if (!user)
                throw new apiError_1.ApiError(404, "User not found");
            task.assignedTo = user._id;
        }
        else {
            task.assignedTo = undefined;
        }
    }
    // Handle priority changes
    if (updateData.priority) {
        task.priority = updateData.priority;
    }
    // Handle position/column changes
    if (updateData.position !== undefined) {
        task.position = updateData.position;
    }
    if (updateData.columnId) {
        const newColumn = yield column_1.default.findOne({
            _id: updateData.columnId,
        });
        if (!newColumn) {
            throw new apiError_1.ApiError(404, "New column not found or access denied");
        }
        // Remove from old column
        yield column_1.default.findByIdAndUpdate(task.column, {
            $pull: { tasks: task._id }
        });
        // Add to new column
        task.column = newColumn._id;
        newColumn.tasks.push(task._id);
        yield newColumn.save();
    }
    // Update other fields
    if (updateData.title)
        task.title = updateData.title;
    if (updateData.description !== undefined) {
        task.description = updateData.description;
    }
    yield task.save();
    return task;
});
exports.updateTaskService = updateTaskService;
const deleteTaskService = (taskId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_1.default.findOneAndDelete({
        _id: taskId,
    });
    if (task == null) {
        throw new apiError_1.ApiError(404, "Task not found or access denied");
    }
    // Remove from column
    yield column_1.default.findByIdAndUpdate(task.column, {
        $pull: { tasks: task._id }
    });
});
exports.deleteTaskService = deleteTaskService;
