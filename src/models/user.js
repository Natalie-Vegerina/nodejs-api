let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    birthDate: Date,
    email: String,
    password: String,
    profession: String
});

module.exports = mongoose.model('User', userSchema);