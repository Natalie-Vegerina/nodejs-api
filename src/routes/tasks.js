const express = require('express');
const tasksService = require('@services/tasks');
const {taskValidator} = require('@validation/');
const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const tasks = await tasksService.list();
        res.json(tasks);
    }
    catch (e) {
        return next(e);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const task = await tasksService.get(req.params.id, ['project', 'assignee', 'reporter']);
        res.status(200).json(task);
    }
    catch (e) {
        return next(e);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        await tasksService.remove(req.params.id);
        res.status(204).send();
    }
    catch (e) {
        return next(e);
    }
});

router.post('/', taskValidator, async function (req, res, next) {
    try {
        let task = await tasksService.add(req.body);
        res.status(201).json(task);
    }
    catch (e) {
        return next(e);
    }
});

router.put('/:id', taskValidator, async function (req, res, next) {
    try {
        const task = await tasksService.update(req.params.id, req.body);
        res.status(200).json(task);
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;