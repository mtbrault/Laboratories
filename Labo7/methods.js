const express = require('express');
const generateID = require('uuid/v4');

myRouter = express.Router();
usersList = [];

myRouter.post('/users', (_, res) => {
	const id = generateID();
	usersList.push({id, tasks: []});
	return res.status(200).send(JSON.stringify({id}));
});

myRouter.get('/:userId/tasks', (req, res) => {
	const userId = req.params.userId;
	const user = getUser(userId);
	if (!user)
		return res.status(400).send(`${userId} is not a correct userId`);
	const tasks = {tasks: user.tasks}
	res.send(JSON.stringify(tasks));
});

myRouter.post('/:userId/tasks', (req, res) => {
	const userId = req.params.userId;
	const task = req.body;
	const user = getUser(userId);
	if (!user)
		return res.status(400).send(`${userId} is not a correct userId`);
	if (!task || !task.name || task.name === '')
		return res.status(400).send(`Bad task provided`)
	const newTask = {id: generateID(), name: task.name};
	user.tasks.push(newTask);
	return res.status(200).send(newTask);
})

myRouter.put('/:userId/tasks/:taskId', (req, res) => {
	const {userId, taskId} = req.params;
	const updateTask = req.body;
	const user = getUser(userId);

	if (!user)
		return res.status(400).send(`${userId} is not a correct userId`);
	if (!updateTask || !updateTask.name || updateTask.name === '')
		return res.status(400).send('Bad task provided for update');
	user.tasks.find(task => task.id === taskId).name = updateTask.name;
	return res.status(200).send({id: taskId, name: updateTask.name});
});

myRouter.delete('/:userId/tasks/:taskId', (req, res) => {
	const {userId, taskId} = req.params;
	const user = getUser(userId);

	if (!user)
		return res.status(400).send(`${userId} is not a correct userId`);
	const tasks = user.tasks;
	user.tasks = tasks.filter(task => task.id !== taskId);
	return res.status(200).send("Task deleted");
})

const getUser = (userId) => {
    return usersList.find( user => user.id === userId);
};

module.exports = myRouter;