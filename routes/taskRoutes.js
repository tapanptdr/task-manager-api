const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");

const validateObjectId = require("../middleware/validateObjectId");

const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.get("/:id", protect, validateObjectId, getTaskById);

router.put("/:id", protect, validateObjectId, updateTask);

router.delete("/:id", protect, validateObjectId, deleteTask);

module.exports = router;