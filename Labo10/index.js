const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const methods = require('./methods');
const CONFIG = require('./config');


const CORS_OPTIONS = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
    credentials: true
};

const port = process.env.PORT || CONFIG.APP_PORT;
const app = express();

app.use(parser.json());
app.use(cors(CORS_OPTIONS));
app.use(methods);

app.listen(port, () => console.log('Listen on port ' + port));