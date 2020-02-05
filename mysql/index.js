const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');

const app = express();

app.use(bodyParser.json());

// RUTAS

app.listen(config.mysqlService.port, () => {
    console.log('Servicio de mysql escuchando en el puerto', config.mysqlService.port)
})