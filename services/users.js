let fs = require('fs');

const getUsers = () =>
    fs.readFile("./" + "users.json", 'utf8', (err, data) => {
        if(err) {
            console.log(err);
            return {};
        }

        // res.json(JSON.parse(data));
        return JSON.parse(data);
    });

const saveUsers = (users) =>
    fs.writeFile("./" + "users.json", JSON.stringify(users), function(err, data) {
        if(err) {
            console.log(err);
            res.status(500);
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    });