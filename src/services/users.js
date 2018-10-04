let User = require('@models/user');
let {EntityNotFoundError, EntitySaveError} = require('@serviceErrors/');
const {InvalidIdError} = require('@dataErrors/');

const list = async () => await User.list();

const get = async (id, keysToPopulate) => {
    if (Array.isArray(keysToPopulate)) {
        keysToPopulate = keysToPopulate.map(s => s.trim()).join(' ');
    }

    let user = await User.get(id, keysToPopulate);
    if (!user) {
        throw new EntityNotFoundError("User with specified id was not found");
    }

    return user;
};

// TODO: Natalie - validate options. Somehow
const find = async (options) => {
    return User.find(options);
};

const add = async user => {
    try {
        return User.add({...user});
    }
    catch (e) {
        throw new EntitySaveError("Failed to save user");
    }
};

const update = async (id, user) => {
    try {
        await User.update({_id: id}, {$set: {...user}});
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("User with specified id was not found");
        }

        throw new EntitySaveError("Failed to update user");
    }

    return get(id);
};

const updateProfile = async (id, profile) => {
    try {
        await User.updateProfile({_id: id}, {...profile});
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("User with specified id was not found");
        }

        throw new EntitySaveError("Failed to update user");
    }

    return get(id);
};

const remove = async id => {
    let result;
    try {
        result = await User.remove({_id: id});
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("User with specified id was not found");
        }

        throw new EntitySaveError("Failed to remove user");
    }

    if (!result) {
        throw new EntityNotFoundError();
    }
};

const UsersService = {
    list,
    get,
    add,
    update,
    updateProfile,
    remove,
    find
};

module.exports = UsersService;