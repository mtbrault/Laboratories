const express = require('express');
const mongoose = require('mongoose');

myRouter = express.Router();

myRouter.post('/users', (_, res) => {
});

myRouter.get('/:userId/tasks', (req, res) => {
});

myRouter.post('/:userId/tasks', (req, res) => {
})

myRouter.put('/:userId/tasks/:taskId', (req, res) => {
});

myRouter.delete('/:userId/tasks/:taskId', (req, res) => {

})

module.exports = myRouter;