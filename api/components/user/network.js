const express = require('express');

// const response = require('../../../network/response');
const response = require('../../../network/response');
// const Controller = require('./controller'); // no sirve ya porq hemos cambiado la estructura del controller
const Controller = require('./index');

const router = express.Router();

// ROuters
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', upsert);

// Internal functions.
function list(req, res) {
    // res.send("todo funciona bien...");
    Controller.list()
        .then((list) => {
            response.success(req, res, list, 200)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });

};

function get(req, res) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        })
}

function upsert(req, res) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
};

module.exports = router;