const express = require('express');
const HTTP_CODE = require('http-status-codes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');
const logger = require('./logger');
const CONFIG = require('./config');
const { jsonGuard } = require('./middleware');

myRouter = express.Router();

mongoose.connect(CONFIG.DB_URL_DEFAULT, 
    { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;

const Task = require('./schema/task.js').model;
const User = require('./schema/user.js').model;

taskRouter = express.Router();

myRouter.post('/users', async (req, res)  => {
    try {
        const user = new User();
        const result = await user.save()
      
        logger.info(result, "User successfully created");
        return res.status(HTTP_CODE.CREATED).send(JSON.stringify(result));
    } catch (error) {
        logger.fatal(error, 'A fatal error occurred. Exiting.');
        return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
    }
});

myRouter.get('/:userId/tasks', async (req, res) => {
	const userId = req.params.userId;
    try {
        const resultUser = await User.findById(userId);
        if (!resultUser) {
            logger.fatal("User not found");
            return res.sendStatus(HTTP_CODE.NOT_FOUND)
        }
        const resultTask = await Task.find({ userId });
        if (!resultTask) {
            logger.fatal("Error while getting tasks");
            return res.sendStatus(HTTP_CODE.NOT_FOUND);
        }
        const finalTask = resultTask.map((task)  => task.toDTO());

        logger.info(finalTask, "User tasks successly found");
        return res.status(HTTP_CODE.OK).send(JSON.stringify(finalTask));
    } catch (error) {
        logger.fatal(error, 'A fatal error occurred. Exiting.');
        return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
    }
});

myRouter.post('/:userId/tasks', bodyParser.json(), jsonGuard, async (req, res) => {
    const userId = req.params.userId;
    const taskData = req.body;
    try {
        const resultUser = await User.findById(userId);
        if (!resultUser) {
            logger.fatal("User not found");
            return res.sendStatus(HTTP_CODE.NOT_FOUND)
        }
        if (!taskData && !taskData.name && taskData.name === '') {
            return res.status(HTTP_CODE.BAD_REQUEST).send(`Task definition is not valid`);
        }
        const { name } = taskData;
        const taskCreate = new Task({ name, userId });
        const resultTask = await taskCreate.save(taskCreate);
        logger.info(resultTask, "User tasks sucessfully created");
        return res.status(HTTP_CODE.CREATED).send(JSON.stringify(resultTask.toDTO()));
    } catch (error) {
        logger.fatal(error, 'A fatal error occurred. Exiting.');
        return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
    }
})

myRouter.put('/:userId/tasks/:taskId', async (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const updateTask = req.body;
    try {
        const resultUser = await User.findById(userId);
        if (!resultUser) {
            logger.fatal("User not found");
            return res.sendStatus(HTTP_CODE.NOT_FOUND)
        }
        if (!updateTask && !updateTask.name && updateTask.name === '') {
            return res.status(HTTP_CODE.BAD_REQUEST).send(`Bad update request`);
        }
        const findedTask = await Task.findById(taskId);
        if (!findedTask) {
            logger.fatal("Task not found");
            return res.sendStatus(HTTP_CODE.NOT_FOUND)
        }
        findedTask.name = updateTask.name;
        const updatedTask = await findedTask.save(findedTask);
        if (!updateTask) {
            logger.fatal("Error while updating task");
            return res.sendStatus(HTTP_CODE.SERVICE_UNAVAILABLE)
        }
        return res.status(HTTP_CODE.OK).send(JSON.stringify(updatedTask.toDTO()));
    } catch (error) {
        logger.fatal(error, 'A fatal error occurred. Exiting.');
        return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
    }
});

myRouter.delete('/:userId/tasks/:taskId', async (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    try {
        const resultUser = await User.findById(userId);
        if (!resultUser) {
            logger.fatal("User not found");
            return res.sendStatus(HTTP_CODE.NOT_FOUND)
        }
        const resultRemove = await Task.findByIdAndRemove(taskId);
        if (!resultRemove) {
            logger.fatal("Task not found");
            return res.sendStatus(HTTP_CODE.NOT_FOUND)
        }
        logger.info("Task : " +  taskId + " Successfuly deleted")
        return res.sendStatus(HTTP_CODE.OK);
    } catch (error) {
        logger.fatal(error, 'A fatal error occurred. Exiting.');
        return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
    }
})

module.exports = myRouter;