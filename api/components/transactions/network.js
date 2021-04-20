const express = require('express');

const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router();

router.post('/', list)

async function list(req, res) {
    await Controller.list(req.query)
        .then((list) => {
            response.success(req, res, list, 200)
        })
        .catch((error) => {
            response.error(req, res, error.message, 500)
        })
}

module.exports = router