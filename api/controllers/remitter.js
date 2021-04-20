const express = require('express');

const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router();

router.post('/', get)
router.post('/update', update)

async function get(req, res) {
    await Controller.get(req.body)
        .then((list) => {
            response.success(req, res, list, 200)
        })
        .catch((error) => {
            response.error(req, res, error.message, 500)
        })
}
async function update(req, res) {
    await Controller.update(req.body)
        .then((list) => {
            response.success(req, res, list, 200)
        })
        .catch((error) => {
            response.error(req, res, error.message, 500)
        })
}

module.exports = router