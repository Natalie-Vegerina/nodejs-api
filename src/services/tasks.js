let Task = require('@models/task');
let {NotFoundError} = require('@errors/');

const list = async () => await Task.list();

const get = async (id, keysToPopulate) => {
    if(Array.isArray(keysToPopulate)) {
        keysToPopulate = keysToPopulate.map(s => s.trim()).join(' ');
    }

    let task = await Task.get(id, keysToPopulate);
    if (!task) {
        throw new NotFoundError("Task with specified id was not found");
    }

    return task;
};

const add = async task => await Task.add({...task});

const update = async (id, task) => {
    await Task.update({_id: id}, {$set: {...task}});
    return await get(id);
};

const remove = async id => {
    let result = await Task.remove({_id: id});
    if (!result) {
        throw new NotFoundError();
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