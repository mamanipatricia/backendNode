//  exporta un middleware
const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    // devuelve una funcion nueva
    function  middleware(req, res, next) {
        switch(action) {
            case 'update':
                //comprobar si existe
                const owner = req.body.id;
                auth.check.own(req, owner);
                next();
                break;
            case 'logged':
            case 'follow':
                auth.check.logged(req); //lo unico q se necesita es un token
                next();
                break;

            default:
                next();
        }
    }

    return middleware;
}