const express = require('express');
const projectsService = require('@services/projects');
const {projectValidator} = require('@validation/');
const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const projects = await projectsService.list();
        res.json(projects);
    }
    catch (e) {
        return next(e);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const project = await projectsService.get(req.params.id, ['tasks']);
        res.status(200).json(project);
    }
    catch (e) {
        return next(e);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        await projectsService.remove(req.params.id);
        res.status(204).send();
    }
    catch (e) {
        return next(e);
    }
});

router.post('/', projectValidator, async function (req, res, next) {
    try {
        let project = await projectsService.add(req.body);
        res.status(201).json(project);
    }
    catch (e) {
        return next(e);
    }
});

router.put('/:id', projectValidator, async function (req, res, next) {
    try {
        const project = await projectsService.update(req.params.id, req.body);
        res.status(200).json(project);
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;