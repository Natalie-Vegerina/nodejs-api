const mongoose = require('mongoose');

const isIdValid = (id) => {
    if (!id) {
        return false;
    }

    try {
        mongoose.Types.ObjectId(id);
        return true;
    } catch (err) {
        return false;
    }
};

const withIdValidation = func => {
    return (id, ...rest) => {
        if (isIdValid(id)) {
            return func(id, ...rest);
        }

        return null;
    }
};

module.exports = {
    withIdValidation,
    isIdValid
};