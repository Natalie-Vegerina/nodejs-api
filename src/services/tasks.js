let Task = require('@models/task');
let {EntityNotFoundError, EntitySaveError} = require('@serviceErrors/');
//  TODO" think about how to make it more abstract, ex. add 'type' property to errors
const {InvalidIdError} = require('@dataErrors/');

const list = async () => await Task.list();

const get = async (id, keysToPopulate) => {
    if (Array.isArray(keysToPopulate)) {
        keysToPopulate = keysToPopulate.map(s => s.trim()).join(' ');
    }

    let task = await Task.get(id, keysToPopulate);
    if (!task) {
        //  TODO: unresolved variable e
        throw new EntityNotFoundError("Task with specified id was not found", e);
    }

    return task;
};

const add = async task => {
    try {
        return await Task.add({...task});
    }
    catch (e) {
        throw new EntitySaveError("Failed to save task", e);
    }
};

const update = async (id, task) => {
    try {
        await Task.update({_id: id}, {$set: {...task}});
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("Task with specified id was not found", e);
        }

        throw new EntitySaveError("Failed to update task", e);
    }

    return get(id);
};

const remove = async id => {
    let result;
    try {
        result = await Task.remove({_id: id});
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("Task with specified id was not found", e);
        }

        throw new EntitySaveError("Failed to remove task", e);
    }

    if (!result) {
        throw new EntityNotFoundError("Task with specified id was not found", e);
    }
};

const tasksService = {
    list,
    get,
    add,
    update,
    remove
};

module.exports = tasksService;