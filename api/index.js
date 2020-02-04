const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express')

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express(); // inicializando

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json')

// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// adicionando al final para que agarre todos los errores de arriba...
app.use(errors);

// LISTEN
app.listen(config.api.port, () => {
    console.log("Listening API ON port ", config.api.port);
});
