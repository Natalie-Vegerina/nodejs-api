'use strict';

require('module-alias/register');

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const users = require('@routers/users');
const config = require('config');
const mongoConfig = config.get('mongodb');

mongoose.connect(mongoConfig.connectionString, { useNewUrlParser: true });

let app = express();
app.use(bodyParser.json());
app.use('/users', users, function(err) {
    console.log(err);
});

let server = app.listen(8081, function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});