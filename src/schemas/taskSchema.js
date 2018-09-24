const TaskSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['project', 'reporter', 'summary'],
    properties: {
        project: {
            type: 'string',
            objectId: true
        },
        assignee: {
            type: 'string',
            objectId: true
        },
        reporter: {
            type: 'string',
            objectId: true
        },
        summary: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        status: {
            type: 'string',
            default: 'Open',
            enum: ["Open", "In Progress", "Done"]
        }
    }
};

module.exports = TaskSchema;