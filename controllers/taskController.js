const Task = require("../models/Task");

const createTask = async (req, res) => {
    try{

        const {
            title,
            description,
            priority,
            dueDate
        } = req.body;

        if(!title){
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
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
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTasks = async (req, res) => {
    try {

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
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.status(200).json({
            success: true,
            task
        });
    }
    catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateTask = async (req, res) => {
    try{
        const task = await Task.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if(!deletedTask){
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    }
    catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};