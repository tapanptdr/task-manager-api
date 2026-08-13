const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const taskRoutes = require("./routes/taskRoutes");

const adminRoutes = require("./routes/adminRoutes");

const errorHandler = require("./middleware/errorMiddleware")

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Task Manager API is running."
    });
});

// Auth Routes
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/admin", adminRoutes);

app.use(errorHandler);

module.exports = app;

