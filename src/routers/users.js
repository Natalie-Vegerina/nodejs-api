let express = require('express');
let usersService = require('@services/users');
let router = express.Router();

router.get('/', async function (req, res) {
    const users = await usersService.list();
    res.json(users);
});

router.get('/:id', async function (req, res) {
    usersService.get(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(err.status).send(err.message));
});

router.delete('/:id', async function (req, res) {
    usersService.remove(req.params.id)
        .then(() => res.status(204).send())
        .catch(err => res.status(err.status).send(err.message));
});

router.post('/', async function (req, res) {
    usersService.add(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(err.status).send(err.message));
});

module.exports = router;