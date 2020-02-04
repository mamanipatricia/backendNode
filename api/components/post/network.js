const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routers
router.get('/', list);
router.post('/', secure('logged'), createPost);

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

