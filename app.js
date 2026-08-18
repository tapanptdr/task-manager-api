const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const  { apiLimiter } = require("./middleware/rateLimitMiddleware");

const app = express();

// const authRoutes = require("./routes/authRoutes");

// const userRoutes = require("./routes/userRoutes");

// const taskRoutes = require("./routes/taskRoutes");

// const adminRoutes = require("./routes/adminRoutes");

const apiRoutes = require("./routes");

const errorHandler = require("./middleware/errorMiddleware")

// Middleware
app.use(express.json());

app.use(helmet());

app.use(cors());

app.use("/api", apiLimiter);

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Task Manager API is running."
    });
});

// Auth Routes
// app.use("/api/v1/auth", authRoutes);

// app.use("/api/v1/users", userRoutes);

// app.use("/api/v1/tasks", taskRoutes);

// app.use("/api/v1/admin", adminRoutes);

app.use("/api/v1", apiRoutes);

app.use(errorHandler);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

module.exports = app;

