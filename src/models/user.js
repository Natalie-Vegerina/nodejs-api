let {User: UserModel} = require('./mongoose');

async function remove(id) {
    const result = await UserModel.deleteOne({_id: id});
    return result.n !== 0;
}

async function get(id, keysToPopulate) {
    let promise = UserModel.findById(id);
    if(keysToPopulate) {
        promise = promise.then(user => UserModel.populate(user, keysToPopulate));
    }

    return promise;
}

async function list() {
    return UserModel.find();
}

async function add(user) {
    return UserModel.create(user);
}

async function update(id, user) {
    return UserModel.updateOne(id, user);
}

async function updateProfile(id, profile) {
    let user = await findOne(id);
    let existingProfile = user.profiles.id(profile._id);
    existingProfile = Object.assign(existingProfile, profile);
    return user.save();
}

const User = {
    remove,
    list,
    get,
    add,
    update,
    updateProfile
};

module.exports = User;