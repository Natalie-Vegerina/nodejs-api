let User = require('@models/user');
let {NotFoundError, UnknownError} = require('@errors/');

const list = async () => {
    try {
        return await User.find();
    }
    catch (error) {
        throw new UnknownError("Failed to list users", 500);
    }
};

const get = async id => {
    let user;
    try {
        user = await User.findOne({_id: id});
    }
    catch (error) {
        throw new UnknownError("Failed to get user", 500);
    }

    if(!user) {
        throw new NotFoundError("User with specified id was not found");
    }

    return user;
};

const add = async user => {
    try {
        return await User.create({...user});
    }
    catch (error) {
        throw new UnknownError("Failed to create user", 500);
    }
};

const remove = async id => {
    let result;
    try {
        result = await User.deleteOne({_id: id});
    }
    catch(error) {
        throw new UnknownError("Failed to delete user", 500);
    }

    if (result.n === 0) {
        throw new NotFoundError();
    }
};

const usersService = {
    list,
    get,
    add,
    remove
};

module.exports = usersService;