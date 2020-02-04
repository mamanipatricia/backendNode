const store = require('../../../store/mysql');
const ctrl = require('./controller')


module.exports = ctrl(store); // crea la instancia del controlador y devolverla

