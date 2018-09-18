const ProjectSchema = {
    type: 'object',
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
            enum: ["Open", "In Progress", "Done"]
        }
    }
};

module.exports = ProjectSchema;