const express = require('express');
const user = require('./components/user/network');``
const app = express(); // inicializando

const config = require('../config.js');
// ROUTER
app.use('/api/user', user);
// escuche

app.listen(config.api.port, () =>  {
    console.log("Listening API ON port ", config.api.port);
});