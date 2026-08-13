const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

const createTask = asyncHandler(async (req, res) => {


        const {
            title,
            description,
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

        const tasks = await Task.find({
            createdBy: req.user._id
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: tasks.length,
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
    

        const task = await Task.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if(!task){
            res.status(404);

            throw new Error("Task Not Found");

        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
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