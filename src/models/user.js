let {User: UserModel} = require('./mongoose');

async function remove(id) {
    const result = await UserModel.deleteOne({_id: id});
    if(result.n === 0) {
        return false;
    }

    return true;
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

const User = {
    remove,
    find,//: UserModel.find.bind(UserModel),
    findOne,//: UserModel.findOne.bind(UserModel),
    create//: UserModel.create.bind(UserModel)
};

module.exports = User;