let express = require('express');
let fs = require('fs');
let usersService = require('@services/users');
let router = express.Router();

router.get('/', function (req, res) {
    usersService.list(res.json.bind(res));
});

router.delete('/:id', function (req, res) {
    usersService.remove(req.params.id, res.json.bind(res));
});

router.post('/', function (req, res) {
    usersService.add(req.body, users => res.json(users));
});

module.exports = router;