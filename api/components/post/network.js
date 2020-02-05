const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routers
router.get('/', list);
router.post('/', secure('logged'), createPost);
router.put('/:id_post', secure('logged'), updatePost);
router.delete('/:id', secure('logged'), destroyPost);

// mostrar todos los post de un usuario determinado....
router.get('/:id/post', secure('logged'), listPostsFromUser);

module.exports = router;

//  functions
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function createPost(req, res, next) {
    Controller.createPost(req.body)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}
function updatePost(req, res, next) {
    Controller.updatePost(req.body, req.params)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function listPostsFromUser(req, res, next) {
    return Controller.listPostsFromUser(req.params.id)
    .then((data) => {
        return response.success(req, res, data, 200);
        })
        .catch(next);
}

function destroyPost(req, res, next) {
    Controller.destroyPost(req.params.id, req.body)
        .then(data => {
            response.success(req, res, data, 204);
        })
        .catch(next);
}
