const lodash = require('lodash');

const removeExtraProperties = (model, schema) => lodash.pick(model, schema);

const sanitize = {
    removeExtraProperties
};

module.exports = sanitize;