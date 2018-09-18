let {Project: ProjectModel} = require('./mongoose');

async function remove(id) {
    const result = await ProjectModel.deleteOne({_id: id});
    return result.n !== 0;
}

async function get(id) {
    return ProjectModel.findOne(id);
}

async function list() {
    return ProjectModel.find();
}

async function add(project) {
    return ProjectModel.create(project);
}

async function update(id, project) {
    return ProjectModel.updateOne(id, project);
}

const Project = {
    remove,
    list,
    get,
    add,
    update
};

module.exports = Project;