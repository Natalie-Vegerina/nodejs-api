let Project = require('@models/project');
let {NotFoundError} = require('@errors/');

const list = async () => await Project.list();

const get = async (id) => {
    let project = await Project.get(id);
    if (!project) {
        throw new NotFoundError("Project with specified id was not found");
    }

    return project;
};

const add = async project => await Project.add({...project});

const update = async (id, project) => {
    await Project.update({_id: id}, {$set: {...project}});
    return await get(id);
};

const remove = async id => {
    let result = await Project.remove({_id: id});
    if (!result) {
        throw new NotFoundError();
    }
};

const projectsService = {
    list,
    get,
    add,
    update,
    remove
};

module.exports = projectsService;