let express = require('express');
let fs = require("fs");
let router = express.Router();

router.get('/', function (req, res) {
    fs.readFile( "./" + "users.json", 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    });
});

router.delete('/:id', function (req, res) {
    fs.readFile( "./" + "users.json", 'utf8', function (err, data) {
        let users = JSON.parse(data);
        delete users["user" + req.params.id];

        fs.writeFile("./" + "users.json", JSON.stringify(users), function(err, data) {
            if(err) {
                console.log(err);
                res.status(500);
                return;
            }

            res.setHeader('Content-Type', 'application/json');
            res.json(users);
        });
    });
});

router.post('/', function (req, res) {
    fs.readFile( "./" + "users.json", 'utf8', function (err, data) {
        let users = JSON.parse(data);
        users["user" + req.body.id] = req.body;
        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(users), function(err, data) {
            if(err) {
                console.log(err);
                res.status(500);
                return;
            }

            res.setHeader('Content-Type', 'application/json');
            res.json(users);
        });
    });
});

module.exports = router;