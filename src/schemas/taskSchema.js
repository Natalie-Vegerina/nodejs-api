const TaskSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['project', 'reporter', 'summary'],
    properties: {
        project: {
            type: 'string'
        },
        assignee: {
            type: 'string'
        },
        reporter: {
            type: 'string'
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