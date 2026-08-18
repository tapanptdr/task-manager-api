const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");

const validateObjectId = require("../middleware/validateObjectId");

const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require("../controllers/taskController");

const { createTaskValidator, updateTaskValidator, getTaskValidator } = require("../validators/taskValidator");

const validate = require("../middleware/validationMiddleware");

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Node.js
 *               description:
 *                 type: string
 *                 example: Complete Express and MongoDB course
 *               status:
 *                 type: string
 *                 enum:
 *                   - Pending
 *                   - In Progress
 *                   - Completed
 *                 example: Pending
 *               priority:
 *                 type: string
 *                 enum:
 *                   - Low
 *                   - Medium
 *                   - High
 *                 example: High
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-30
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.post("/", protect, createTaskValidator, validate, createTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get user's tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tasks per page
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - Pending
 *             - In Progress
 *             - Completed
 *         description: Filter by status
 *
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum:
 *             - Low
 *             - Medium
 *             - High
 *         description: Filter by priority
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search tasks by title
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - newest
 *             - oldest
 *         description: Sort tasks by creation date
 *
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       401:
 *         description: Unauthorized
 */

router.get("/", protect, getTaskValidator, validate, getTasks);


/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

router.get("/:id", protect, validateObjectId, getTaskById);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - Pending
 *                   - In Progress
 *                   - Completed
 *               priority:
 *                 type: string
 *                 enum:
 *                   - Low
 *                   - Medium
 *                   - High
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid task ID or validation error
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

router.put("/:id", protect, validateObjectId, updateTaskValidator, validate, updateTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

router.delete("/:id", protect, validateObjectId, deleteTask);

module.exports = router;