let {Task: TaskModel} = require('./mongoose');

async function remove(id) {
    const result = await TaskModel.deleteOne({_id: id});
    return result.n !== 0;
}

async function get(id, keysToPopulate) {
    let promise = TaskModel.findById(id);
    if(keysToPopulate) {
        promise = promise.then(task => TaskModel.populate(task, keysToPopulate));
    }

    return promise;
}

async function list() {
    return TaskModel.find();
}

async function add(task) {
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