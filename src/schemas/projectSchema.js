const ProjectSchema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        technology: {type: 'string'},
        customer: {type: 'string'}
    }
};

module.exports = ProjectSchema;