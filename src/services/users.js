let User = require('@models/user');
let {NotFoundError} = require('@errors/');

const list = async () => await User.find();

const get = async id => {
    let user = await User.findOne({_id: id});
    if (!user) {
        throw new NotFoundError("User with specified id was not found");
    }

    return user;
};

const add = async user => await User.create({...user});

const update = async (id, user) => {
    await User.updateOne({_id: id}, {$set: {...user}});
    return await get(id);
};

const remove = async id => {
    let result = await User.deleteOne({_id: id});
    if (!result) {
        throw new NotFoundError();
    }
};

const usersService = {
    list,
    get,
    add,
    update,
    remove
};

module.exports = usersService;