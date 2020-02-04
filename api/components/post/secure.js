//  exporta un middleware
const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    // devuelve una funcion nueva
    function  middleware(req, res, next) {
        switch(action) {
            case 'logged':
                auth.check.logged(req); //lo unico q se necesita es un token
                next();
                break;

            default:
                next();
        }
    }

    return middleware;
}