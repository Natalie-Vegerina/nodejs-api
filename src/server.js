'use strict';

require('module-alias/register');

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const users = require('@routers/users');
const config = require('config');
const mongoConfig = config.get('mongodb');
const {ValidationError} = require('express-json-validator-middleware');

mongoose.connect(mongoConfig.connectionString, {useNewUrlParser: true});

const rewriteValidationError = error =>
    error.validationErrors.body.map(err => `${err.dataPath.substring(1)} ${err.message}`);

let app = express();
app.use(bodyParser.json());
app.use('/users', users);

app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    if (err instanceof ValidationError) {
        res.status(400).send(rewriteValidationError(err));
        return;
    }

    console.log(err);
    res.status(err.status || 500)
        .send(err.message || "Something wicked this way came");
});

let server = app.listen(8081, function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});