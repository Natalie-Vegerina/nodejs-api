let User = require('@models/user');
let {NotFoundError} = require('@errors/');

const list = async () => await User.list();

const get = async (id, keysToPopulate) => {
    if (Array.isArray(keysToPopulate)) {
        keysToPopulate = keysToPopulate.map(s => s.trim()).join(' ');
    }

    let user = await User.get(id, keysToPopulate);
    if (!user) {
        throw new NotFoundError("User with specified id was not found");
    }

    return user;
};

const add = async user => {
    try {
        return User.add({...user});
    }
    catch (e) {
        throw new DatabaseError("Failed to save entity: " + e.message, 400);
    }
};

const update = async (id, user) => {
    try {
        await User.update({_id: id}, {$set: {...user}});
    }
    catch (e) {
        throw new DatabaseError("Failed to update entity: " + e.message, 400);
    }

    return get(id);
};

const updateProfile = async (id, profile) => {
    try {
        await User.updateProfile({_id: id}, {...profile});
    }
    catch (e) {
        throw new DatabaseError("Failed to update entity: " + e.message, 400);
    }

    return get(id);
};

const remove = async id => {
    let result = await User.remove({_id: id});
    if (!result) {
        throw new NotFoundError();
    }
};

const usersService = {
    list,
    get,
    add,
    update,
    updateProfile,
    remove
};

module.exports = usersService;