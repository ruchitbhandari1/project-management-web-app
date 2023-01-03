const TaskObj = require('../models/taskModel');
const ProjectObj = require('../models/projectModel')
const catchAsync = require('../utils/catchAsync');
const { default: mongoose } = require('mongoose');

exports.getAllTasks = catchAsync(async function(req, res, next){
    const projectId = req.params.projectId;
    const tasks = await TaskObj.find({projectId}).sort({completed:1, createdAt: 1})
    res.status(200).json({
        status: 'success',
        data: {
            tasks
        }
    })
})

exports.create = catchAsync(async function(req, res, next){
    const projectId = req.body.projectId;
    const newTask = {
        name: req.body.name,
        description: req.body.description,
        projectId,
    }
    const task = await TaskObj.create(newTask);
    const project = await ProjectObj.findById(projectId)
    project.tasks.push(mongoose.Types.ObjectId(task._id))
    project.totalTasks += 1
    await project.save();
    res.status(201).json({
        status: "success",
        data: {}
    })
})

exports.delete = catchAsync(async function(req, res, next){
    const taskId = req.params.taskId;
    const task = await TaskObj.findById(taskId)
    const project = await ProjectObj.findById(task.projectId)
    project.tasks = project.tasks.filter((curr) => !curr.equals(taskId));
    project.totalTasks -= 1
    if(task.completed){
        project.completedTasks -= 1
    }
    await project.save()
    await TaskObj.findByIdAndDelete(taskId);
    res.status(202).json({
        status: "success",
        data: {}
    })
})

exports.toggleCompleted = catchAsync(async function(req, res, next){
    const taskId = req.params.taskId
    const task = await TaskObj.findById(taskId)
    const project = await ProjectObj.findById(task.projectId)
    if(task.completed){
        task.completed = false
        project.completedTasks -= 1
    }else{
        task.completed = true
        project.completedTasks += 1
    }
    await task.save()
    await project.save()
    res.status(200).json({
        status: "success",
        data: {}
    })
})