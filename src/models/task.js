const {Task: TaskModel} = require('./mongoose');
const {Validation} = require('@utils/');

async function remove(id) {
    const result = await TaskModel.deleteOne({_id: id});
    return result.n !== 0;
}

async function get(id, keysToPopulate) {
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
    return TaskModel.create(task);
}

async function update(id, task) {
    return TaskModel.updateOne(id, task);
}

const Task = {
    remove: Validation.withIdValidation(remove),
    list,
    get: Validation.withIdValidation(get),
    add,
    update: Validation.withIdValidation(update)
};

module.exports = Task;