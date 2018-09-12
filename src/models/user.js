let {User: UserModel} = require('./mongoose');

async function deleteOne(id) {
    const result = await UserModel.deleteOne({_id: id});
    return result.n !== 0;
}

async function findOne(id) {
    return UserModel.findOne(id);
}

async function find() {
    return UserModel.find();
}

async function create(user) {
    return UserModel.create(user);
}

async function updateOne(id, user) {
    return UserModel.updateOne(id, user);
}

const User = {
    deleteOne,
    find,
    findOne,
    create,
    updateOne
};

module.exports = User;