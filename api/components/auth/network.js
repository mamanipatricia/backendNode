const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();


router.post('/login', function (req, res) {
    Controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, token, 200)
            // res.send(token, 200); ES THE SAME AS ABOVE..`
        })
        .catch((err) => {
            console.log('***************')
            console.log(err)
            console.log('***************')

            response.error(req, res, 'información invalida..', 400);
        })
})


module.exports = router;