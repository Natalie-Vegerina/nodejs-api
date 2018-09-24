const {Task: TaskModel} = require('./mongoose');
const {Validation} = require('@dataValidation/');
const {DatabaseError} = require('@dataErrors/');

async function remove(id) {
    try {
        const result = await TaskModel.deleteOne({_id: id});
        return result.n !== 0;
    } catch (e) {
        throw new DatabaseError(e.message, e);
    }
}

async function get(id, keysToPopulate) {
    try {
        let task = await TaskModel.findById(id);
        if (task && keysToPopulate) {
            task = await TaskModel.populate(task, keysToPopulate);
        }

        return task;
    } catch (e) {
        throw new DatabaseError(e.message, e);
    }
}

async function list() {
    try {
        return await TaskModel.find();
    } catch (e) {
        throw new DatabaseError(e.message, e);
    }
}

async function add(task) {
    try {
        return await TaskModel.create(task);
    } catch (e) {
        throw new DatabaseError(e.message, e);
    }
}

async function update(id, task) {
    try {
        return await TaskModel.updateOne(id, task);
    } catch (e) {
        throw new DatabaseError(e.message, e);
    }
}

const Task = {
    remove: Validation.withIdValidation(remove),
    list,
    get: Validation.withIdValidation(get),
    add,
    update: Validation.withIdValidation(update)
};

module.exports = Task;