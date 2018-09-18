const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    technology: String,
    customer: String
}, { timestamps: true});

module.exports = mongoose.model('Project', projectSchema);