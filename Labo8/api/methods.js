const express = require('express');
const generateToken = require('uuid/v4');

const router = express.Router();

let userList = [];

router.post('/users', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (!username || !password)
		return res.sendStatus(400);
	userList.push({username, password});
	return res.sendStatus(201);
});

router.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (!username || ! password)
		return res.sendStatus(400);
	const user = userList.find(elem => {
		return (elem.username === username && elem.password === password)
	});
	if (!user)
		return res.sendStatus(401);
	const token = generateToken();
	user.token = token;
	res.status(200).send({token});
});

router.get('/profile', (req, res) => {
	const token = req.headers.token;

	const user = userList.find(elem => {
		return elem.token === token;
	})
	if (!user)
		return res.status(401).send("Bad token");
	res.send('Bienvenue sur ton profile ' + user.username + ' !');
});

module.exports = router;