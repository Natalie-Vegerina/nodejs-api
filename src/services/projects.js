let Project = require('@models/project');
let {EntityNotFoundError, EntitySaveError} = require('@serviceErrors/');
const {InvalidIdError} = require('@dataErrors/');

const list = async () => Project.list();

const get = async (id) => {
    let project = await Project.get(id);
    if (!project) {
        throw new EntityNotFoundError("Project with specified id was not found");
    }

    return project;
};

const add = async project => {
    try {
        return Project.add({...project});
    }
    catch (e) {
        throw new EntitySaveError("Failed to save project");
    }
};

const update = async (id, project) => {
    try {
        await Project.update({_id: id}, {$set: {...project}});
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("Project with specified id was not found");
        }

        throw new EntitySaveError("Failed to update project");
    }

    return await get(id);
};

const remove = async id => {
    let result;
    try {
        result = await Project.remove({_id: id});
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("Project with specified id was not found");
        }

        throw new EntitySaveError("Failed to remove project");
    }

    if (!result) {
        throw new EntityNotFoundError();
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