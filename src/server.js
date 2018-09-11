'use strict';
// global.__dataDir = './data';

require('module-alias/register');

let mongoose = require('mongoose');
let express = require('express');
let bodyParser = require('body-parser');

let users = require('@routers/users');

mongoose.connect('mongodb://localhost/local');

let app = express();
app.use(bodyParser.json());
app.use('/users', users);

let server = app.listen(8081, function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});