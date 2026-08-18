require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = require("../app");

const User = require("../models/User");
const Task = require("../models/Task");

let user;
let token;


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI);
});


beforeEach(async () => {

    await User.deleteMany({});
    await Task.deleteMany({});

    user = await User.create({
        name: "Test User",
        email: "testuser@test.com",
        password: "123456",
        role: "user"
    });

    token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: "15m"
        }
    );
});


afterAll(async () => {
    await mongoose.connection.close();
});



describe("Task API", () => {

    test("should create a task", async () => {

        const response = await request(app)
            .post("/api/v1/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Learn Jest",
                description: "Write backend tests",
                status: "In Progress",
                priority: "High"
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.task.title)
            .toBe("Learn Jest");

        expect(response.body.task.status)
            .toBe("In Progress");

        expect(response.body.task.priority)
            .toBe("High");

    });

    test("should get user's tasks", async () => {

        await Task.create({
            title: "Task 1",
            description: "First task",
            status: "Pending",
            priority: "Low",
            createdBy: user._id
        });

        await Task.create({
            title: "Task 2",
            description: "Second task",
            status: "Completed",
            priority: "High",
            createdBy: user._id
        });

        const response = await request(app)
            .get("/api/v1/tasks")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.totalTasks).toBe(2);

        expect(response.body.tasks).toHaveLength(2);

    });

    test("should filter tasks by status", async () => {

        await Task.create({
            title: "Pending Task",
            status: "Pending",
            priority: "Low",
            createdBy: user._id
        });

        await Task.create({
            title: "Completed Task",
            status: "Completed",
            priority: "High",
            createdBy: user._id
        });

        const response = await request(app)
            .get("/api/v1/tasks?status=Completed")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.totalTasks).toBe(1);

        expect(response.body.tasks[0].status)
            .toBe("Completed");

    });

    test("should reject invalid status filter", async () => {

        const response = await request(app)
            .get("/api/v1/tasks?status=Done")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);

    });

    test("should update user's task", async () => {

        const task = await Task.create({
            title: "Old Title",
            description: "Old description",
            status: "Pending",
            priority: "Low",
            createdBy: user._id
        });

        const response = await request(app)
            .put(`/api/v1/tasks/${task._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Updated Title",
                status: "Completed",
                priority: "High"
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.task.title)
            .toBe("Updated Title");

        expect(response.body.task.status)
            .toBe("Completed");

        expect(response.body.task.priority)
            .toBe("High");

    });

    test("should delete user's task", async () => {

        const task = await Task.create({
            title: "Delete Me",
            status: "Pending",
            priority: "Low",
            createdBy: user._id
        });

        const response = await request(app)
            .delete(`/api/v1/tasks/${task._id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        const deletedTask = await Task.findById(task._id);

        expect(deletedTask).toBeNull();

    });

    test("should not allow user to update another user's task", async () => {

        const otherUser = await User.create({
            name: "Other User",
            email: "other@test.com",
            password: "123456",
            role: "user"
        });

        const otherTask = await Task.create({
            title: "Other User Task",
            status: "Pending",
            priority: "Low",
            createdBy: otherUser._id
        });

        const response = await request(app)
            .put(`/api/v1/tasks/${otherTask._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Hacked Task"
            });

        expect(response.statusCode).toBe(404);

        expect(response.body.success).toBe(false);

    });



});