const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

const createTask = asyncHandler(async (req, res) => {


        const {
            title,
            description,
            status,
            priority,
            dueDate
        } = req.body;

        if(!title){
            res.status(400);

            throw new Error("Title is required");
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });

});

const getTasks = asyncHandler (async (req, res) => {

    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(
        Math.max(Number(req.query.limit) || 10, 1),
        100
    );

    const skip = (page - 1) * limit;

    //Base Filter
    const filter = {
        createdBy: req.user._id
    };

    // Status Filter
    if(req.query.status){
        filter.status = req.query.status;
    }

    // Priority Filter
    if(req.query.priority){
        filter.priority = req.query.priority;
    }

    // Search
    if(req.query.search){
        filter.title = {
            $regex: req.query.search,
            $options: "i"
        };
    }

    // Sorting
    let sort = {
        createdAt: -1
    };

    if(req.query.sort === "oldest"){
        sort = {
            createdAt: 1
        };
    }

    // Get Tasks
    const tasks = await Task.find(filter)
        .sort()
        .skip(skip)
        .limit(limit);

    const totalTasks = await Task.countDocuments(filter);

    res.status(200).json({
        success: true,
        count: tasks.length,
        totalTasks,
        page,
        limit,
        totalPages: Math.ceil(totalTasks / limit),
        tasks
    });
});

const getTaskById = asyncHandler(async (req, res) => {

        const task = await Task.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if(!task){
            res.status(404);

            throw new Error("Task Not Found");
        }

        res.status(200).json({
            success: true,
            task
        });
});

const updateTask = asyncHandler(async (req, res) => {

    const {
        title,
        description,
        status,
        priority,
        dueDate
    } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
        {
            _id: req.params.id,
            createdBy: req.user._id
        },
        {
            title,
            description,
            status,
            priority,
            dueDate
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    if (!updatedTask) {
        res.status(404);
        throw new Error("Task Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task: updatedTask
    });
});

const deleteTask = asyncHandler(async (req, res) => {

        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if(!deletedTask){
            res.status(404);

            throw new Error("Task Not Found");
        }
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    
});

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};