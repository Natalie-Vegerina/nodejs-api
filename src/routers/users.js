let express = require('express');
let usersService = require('@services/users');
let router = express.Router();

router.get('/', async function (req, res) {
    // try {
        const users = await usersService.list();
        res.json(users);
    // }
    // catch (err) {
    //     res.status(err.status || 500)
    //         .send(err.message || "Something wicked this way came");
    // }
});

router.get('/:id', async function (req, res) {
    try {
        const user = await usersService.get(req.params.id);
        res.status(200).json(user)
    }
    catch (err) {
        res.status(err.status || 500)
            .send(err.message || "Something wicked this way came");
    }
});

router.delete('/:id', async function (req, res) {
    try {
        await usersService.remove(req.params.id);
        res.status(204).send();
    }
    catch (err) {
        res.status(err.status || 500)
            .send(err.message || "Something wicked this way came");
    }
});

router.post('/', async function (req, res) {
    try {
        const user = await usersService.add(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(err.status || 500)
            .send(err.message || "Something wicked this way came");
    }
});

router.post('/:id', async function (req, res) {
    try {
        const user = await usersService.update(req.params.id, req.body);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(err.status || 500)
            .send(err.message || "Something wicked this way came");
    }
});

module.exports = router;