const {Task: TaskModel} = require('./mongoose');
// const {DatabaseError} = require('@errors/');

async function remove(id) {
    const result = await TaskModel.deleteOne({_id: id});
    return result.n !== 0;
}

async function get(id, keysToPopulate) {
    /*let promise = TaskModel.findById(id);
    if(keysToPopulate) {
        promise = promise.then(task => TaskModel.populate(task, keysToPopulate));
    }

    return promise;*/
    let task = await TaskModel.findById(id);
    if(keysToPopulate) {
        task = await TaskModel.populate(task, keysToPopulate);
    }

    return task;
}

async function list() {
    return TaskModel.find();
}

async function add(task) {
    /*try {
        return await TaskModel.create(task);
    }
    catch (e) {
        throw new DatabaseError("Failed to save Task. " + e.message);
    }*/
    return TaskModel.create(task);
}

async function update(id, task) {
    return TaskModel.updateOne(id, task);
}

const Task = {
    remove,
    list,
    get,
    add,
    update
};

module.exports = Task;