const express = require('express');
const projectsService = require('@services/projects');
const {projectValidator} = require('@validation/');
const router = express.Router();

router.get('/', async function (req, res) {
    const projects = await projectsService.list();
    res.json(projects);
});

router.get('/:id', async function (req, res) {
    const project = await projectsService.get(req.params.id, ['tasks']);
    res.status(200).json(project)
});

router.delete('/:id', async function (req, res) {
    await projectsService.remove(req.params.id);
    res.status(204).send();
});

router.post('/', projectValidator, async function (req, res) {
    let project = await projectsService.add(req.body);
    res.status(201).json(project);
});

router.put('/:id', projectValidator, async function (req, res) {
    const project = await projectsService.update(req.params.id, req.body);
    res.status(200).json(project);
});

module.exports = router;