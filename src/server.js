'use strict';

require('module-alias/register');

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('@routes/');
const config = require('config');
const mongoConfig = config.get('mongodb');
// const {EntityNotFoundError, EntitySaveError} = require('@serviceErrors/');
// const Ajv = require('ajv');
const {ErrorHandler} = require('@errors/');

mongoose.connect(mongoConfig.connectionString, {useNewUrlParser: true});

/*const rewriteValidationError = error =>
    error.errors.map(err => {
        return `${err.dataPath.substring(1)} ${err.message}`;
    });*/

let app = express();
app.use(bodyParser.json());
app.use('/', routes.Auth);
app.use('/projects', routes.Projects);
app.use('/users', routes.Users);
app.use('/tasks', routes.Tasks);

app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    // ErrorHandler.printConsole(err);
    ErrorHandler.handle(err, res);
    /*if (err instanceof Ajv.ValidationError) {
        res.status(400).send(rewriteValidationError(err));
    }
    else if(err instanceof EntityNotFoundError) {
        res.status(404).send(err.message);
    }
    else if(err instanceof EntitySaveError) {
        res.status(500).send(err.message);
    }
    else {
        res.status(err.status || 500)
            .send(err.message || "Something wicked this way came");
    }*/
});

let server = app.listen(8081, function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});