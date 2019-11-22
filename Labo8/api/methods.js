const express = require('express');
const generateToken = require('uuid/v4');
const Cookies = require('js-cookie');

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
	userList.forEach(elem => {
		if (elem.username === username && elem.password === password) {
			const token = generateToken();
			elem.token = token;
			res.cookie('token', token);
			return res.status(200).send({token});
		}
	})
	return res.sendStatus(401);
});

router.get('/profile', (req, res) => {
	const token = req.body.token;

	userList.forEach(elem => {
		if (elem.token === token)
			return res.send('Bienvenue sur ton profile ' + elem.username + ' !');
	})
	return res.status(401).send("Bad token");
});

module.exports = router;