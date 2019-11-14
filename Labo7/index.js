const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const myToDoList = require('./methods');

const CORS_OPTIONS = {
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
};

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(cors(CORS_OPTIONS));
app.use(myToDoList);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});