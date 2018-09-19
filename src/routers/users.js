const express = require('express');
const usersService = require('@services/users');
const {userValidator} = require('@validation/');
const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const users = await usersService.list();
        res.json(users);
    }
    catch (e) {
        return next(e);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const user = await usersService.get(req.params.id, ['tasks']);
        res.status(200).json(user);
    }
    catch (e) {
        return next(e);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        await usersService.remove(req.params.id);
        res.status(204).send();
    }
    catch (e) {
        return next(e);
    }
});

router.post('/', userValidator, async function (req, res, next) {
    try {
        let user = await usersService.add(req.body);
        res.status(201).json(user);
    }
    catch (e) {
        return next(e);
    }
});

router.put('/:id', userValidator, async function (req, res, next) {
    try {
        const user = await usersService.update(req.params.id, req.body);
        res.status(200).json(user);
    }
    catch (e) {
        return next(e);
    }
});

router.post('/:id/profile', /*[userValidator.validate()],*/ async function (req, res, next) {
    try {
        const user = await usersService.updateProfile(req.params.id, req.body);
        res.status(200).json(user);
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;