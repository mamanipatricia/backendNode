// const store = require('../../../store/dummy');
const store = require('../../../store/mysql');
const ctrl = require('./controller')


module.exports = ctrl(store); // con esto tenemos un store en donde le inyectamos, para tenerlo aislado dentro del propio archivo.