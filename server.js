'use strict';
let express = require('express');
let bodyParser = require('body-parser');

let users = require('./routers/users')

let app = express();
app.use(bodyParser.json());
app.use('/users', users);

let server = app.listen(8081, function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});


/*
{
   "user1" : {
      "name" : "mahesh",
	  "password" : "password1",
	  "profession" : "teacher",
	  "id": 1
   },
   "user2" : {
      "name" : "suresh",
	  "password" : "password2",
	  "profession" : "librarian",
	  "id": 2
   },
   "user3" : {
      "name" : "ramesh",
	  "password" : "password3",
	  "profession" : "clerk",
	  "id": 3
   }
}


{
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
*/