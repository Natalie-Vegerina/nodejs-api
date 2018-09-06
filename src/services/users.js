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

const addNewUser = (users, newUser, callback) => {
    let updatedUsers = {...users, ...{["user" + newUser.id]: newUser}};
    save(updatedUsers, callback);
};

const add = (newUser, callback) => {
    list(users => addNewUser(users, newUser, callback));
};

const removeUser = users => {
    return (id, callback) => {
        delete users["user" + id];
        save(users, callback);
    };
};

const removeUser2 = (loadUsers) => {
    return (id, callback) =>
        () => loadUsers(removeUser);
    /*
    let updatedUsers = users;
    delete updatedUsers["user" + id];
    save(updatedUsers, callback);*/
};

const removeUser3 = (id, callback) => {
    return users => {
        delete users["user" + id];
        save(users, callback);
    };
};

const removeUser4 = (loadUsers, id, callback) =>
    loadUsers(removeUser3(id, callback));


const removeUser5 = (loadUsers, id, callback) => {
    let removeUser = users => {
        delete users["user" + id];
        save(users, callback);
    };

    loadUsers(removeUser);
};


const removeUser6 = (loadUsers, id) => {
    return callback => {
        let removeUser = users => {
            delete users["user" + id];
            save(users, callback);
        };

        loadUsers(removeUser);
    }
};

/*const remove = (id, callback) => {
    list(users => removeUser(users, id, callback));
};*/
const remove = (id, callback) => {
    removeUser6(list, id)(callback);
    //removeUser5(list, id, callback);
    //list(removeUser3(id, callback));
    //removeUser2(list)(id, callback);
    // list(removeUser);//(id, callback));
    // removeUser2(list, id, callback);
    // list(users => removeUser(users, id, callback));
};

const usersService = {
    list,
    add,
    remove
};

module.exports = usersService;