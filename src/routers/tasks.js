const express = require('express');
const tasksService = require('@services/tasks');
// const {userValidator} = require('@validation/');
const router = express.Router();

router.get('/', async function (req, res) {
    const tasks = await tasksService.list();
    res.json(tasks);
});

router.get('/:id', async function (req, res) {
    const task = await tasksService.get(req.params.id, ['project', 'assignee', 'reporter']);
    res.status(200).json(task)
});

router.delete('/:id', async function (req, res) {
    await tasksService.remove(req.params.id);
    res.status(204).send();
});

router.post('/', /*[userValidator.cleanUp, userValidator.validate()],*/ async function (req, res) {
    let task = await tasksService.add(req.body);
    res.status(201).json(task);
});

router.put('/:id', /*[userValidator.cleanUp, userValidator.validate()],*/ async function (req, res) {
    const task = await tasksService.update(req.params.id, req.body);
    res.status(200).json(task);
});

module.exports = router;