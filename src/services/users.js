let fs = require('fs');
let {dataDir} = require('@root/config');

const list = (callback) =>
    fs.readFile(`${dataDir}/users.json`, 'utf8', (err, data) => {
        if (err) {
            // TODO: throw
            console.log(err);
            return;
        }

        callback(JSON.parse(data));
    });

const save = (users, callback) =>
    fs.writeFile(`${dataDir}/users.json`, JSON.stringify(users), function (err, data) {
        if (err) {
            // TODO: Natalie - throw
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