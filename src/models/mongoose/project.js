const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    technology: String,
    customer: String
}, { timestamps: true});

module.exports = mongoose.model('Project', projectSchema);