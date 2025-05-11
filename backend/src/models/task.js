"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    column: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Column",
        required: true // Enforces relationship
    },
    assignedTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    position: { type: Number, required: true }
});
exports.default = (0, mongoose_1.model)("Task", TaskSchema);
