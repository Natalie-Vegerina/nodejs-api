const express = require('express');
const usersService = require('@services/users');
const {userValidator} = require('@validation/');
const router = express.Router();

router.get('/', async function (req, res) {
    const users = await usersService.list();
    res.json(users);
});

router.get('/:id', async function (req, res) {
    const user = await usersService.get(req.params.id);
    res.status(200).json(user)
});

router.delete('/:id', async function (req, res) {
    await usersService.remove(req.params.id);
    res.status(204).send();
});

router.post('/', [userValidator.cleanUp, userValidator.validate()], async function (req, res) {
    let user = await usersService.add(req.body);
    res.status(201).json(user);
});

router.post('/:id', [userValidator.cleanUp, userValidator.validate()], async function (req, res) {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).json(user);
});

module.exports = router;