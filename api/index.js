const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express')

const config = require('../config.js');
const user = require('./components/user/network');

const app = express(); // inicializando

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json')

// ROUTER
app.use('/api/user', user);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// LISTEN
app.listen(config.api.port, () =>  {
    console.log("Listening API ON port ", config.api.port);
});

