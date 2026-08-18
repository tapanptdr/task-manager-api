const { body, query } = require("express-validator");

const createTaskValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Task Title is required")
        .isLength({ max: 200 })
        .withMessage("Task title cannot exceed 200 character"),

    body("description")
        .optional()
        .trim(),

    body("status")
        .optional()
        .isIn(["Pending", "In Progress", "Completed"])
        .withMessage("Invalid Task status"),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Invalid Task priority"),

    body("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Due date must be a valid date")
];

const updateTaskValidator = [
    body("title")
        .optional()
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage("Task title must be between 0 and 200 characters"),

    body("description")
        .optional()
        .trim(),

    body("status")
        .optional()
        .isIn(["Pending", "In Progress", "Completed"])
        .withMessage("Invalid task status"),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Invalid task priority"),

    body("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Due date must be valid date")
];

const getTaskValidator = [
    query("status")
        .optional()
        .isIn(["Pending", "In Progress", "Completed"])
        .withMessage("Invalid Task Status"),

    query("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Invalid Task Priority"),

    query("sort")
        .optional()
        .isIn(["newest", "oldest"])
        .withMessage("Invalid sort option"),

    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 0 and 100"),

    query("search")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Search cannot exceed 100 characters")
];

module.exports = {
    createTaskValidator,
    updateTaskValidator,
    getTaskValidator
};