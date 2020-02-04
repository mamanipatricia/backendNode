const express = require('express');

// const response = require('../../../network/response');
const secure = require('./secure');

const response = require('../../../network/response');
// const Controller = require('./controller'); // no sirve ya porq hemos cambiado la estructura del controller
const Controller = require('./index');
// secure me refiere al middleware...

const router = express.Router();

// Routers
router.get('/', list);
// follow user
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/following', following); // para un usuario con id{x},sus followers
router.get('/:id', get);
router.post('/', upsert);
// router.put('/', upsert);
router.put('/', secure('update'), upsert);// middleware
router.delete('/:id', deleteUsr);

// Internal functions.
function list(req, res, next) {
    // res.send("todo funciona bien...");
    // .catch(next); // ya q hemos creado un middleware, los errores gestiona automaticamente en express next()
    Controller.list()
        .then((list) => {
            response.success(req, res, list, 200)
        })
        .catch(next);

};

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
};

function deleteUsr(req, res) {
    Controller.deleteUser(req.params.id)
        .then(resd => {
            response.success(req, res, resd, 204)
        })
        .catch(next);
};

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id) // req.user.id = el id del usr al q queremos seguir juntamente con el token,
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

//!todo: CREAR UNA FUNCION PARA VER A LOS USUARIOS QUE ESTAN SIGUIENDO A UN USUARIO.

function following(req, res, next) {
    return Controller.following(req.params.id)
        .then((data) => {
            return response.success(req, res, data, 200);
        })
        .catch(next);
}


module.exports = router;