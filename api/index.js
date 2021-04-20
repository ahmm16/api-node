const express = require('express')
const bodyParser = require('body-parser')
var multer = require('multer');
var upload = multer();

const config = require('../config.js')
const transactions = require('./components/transactions/network')
const remitter = require('./components/remitter/network')
const { corsMiddleware } = require('./helpers/cors');

const app = express();

corsMiddleware(app);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing multipart/form-data
app.use(upload.array())

//ROUTER
app.use('/api/listTransaction', transactions);
app.use('/api/remitter', remitter);

app.listen(config.api.port, () => {
  console.log("application running on port: " + config.api.port)
})