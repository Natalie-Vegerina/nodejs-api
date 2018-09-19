let Project = require('@models/project');
let {NotFoundError} = require('@errors/');

const list = async () => Project.list();

const get = async (id) => {
    let project = await Project.get(id);
    if (!project) {
        throw new NotFoundError("Project with specified id was not found");
    }

    return project;
};

const add = async project => {
    try {
        return Project.add({...project});
    }
    catch (e) {
        throw new DatabaseError("Failed to save entity: " + e.message, 400);
    }
};

const update = async (id, project) => {
    try {
        await Project.update({_id: id}, {$set: {...project}});
    }
    catch (e) {
        throw new DatabaseError("Failed to update entity: " + e.message, 400);
    }

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