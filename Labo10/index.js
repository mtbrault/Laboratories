const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const methods = require('./methods');

const CORS_OPTIONS = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
    credentials: true
};

const port = process.env.PORT || 8080;
const app = express();

app.use(parser.json());
app.use(cors(CORS_OPTIONS));
app.use(methods);

app.listen(port, () => console.log('Listen on port ' + port));