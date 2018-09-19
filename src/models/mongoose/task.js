const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new mongoose.Schema({
    _id: ObjectId,
    project: {
        ref: 'Project',
        type: ObjectId
    },
    assignee: {
        ref: 'User',
        type: ObjectId
    },
    reporter: {
        ref: 'User',
        type: ObjectId
    },
    summary: String,
    description: String,
    status: {
        type: String,
        enum: ["Open", "In Progress", "Done"]
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);