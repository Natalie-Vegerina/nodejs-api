let fs = require('fs');

const list = (callback) =>
    fs.readFile(`${__dataDir}/users.json`, 'utf8', (err, data) => {
        if (err) {
            // TODO: throw
            console.log(err);
            return;
        }

        callback(JSON.parse(data));
    });

const save = (users, callback) =>
    fs.writeFile(`${__dataDir}/users.json`, JSON.stringify(users), function (err, data) {
        if (err) {
            // TODO: throw
            console.log(err);
            return;
        }

        callback(users);
    });

const addNewUser = (users, newUser) => {
    return {...users, ...{["user" + newUser.id]: newUser}};
};

const add = (newUser, callback) => {
    list(users => save(addNewUser(users, newUser), callback));
};

const removeUser = (users, id) => {
    delete users["user" + id];
    return users;
};

const remove = (id, callback) => {
    list(users => save(removeUser(users, id), callback));
};

const usersService = {
    list,
    add,
    remove
};

module.exports = usersService;