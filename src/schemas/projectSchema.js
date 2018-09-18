const ProjectSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['name'],
    properties: {
        name: {type: 'string'},
        technology: {type: 'string'},
        customer: {type: 'string'}
    }
};

module.exports = ProjectSchema;