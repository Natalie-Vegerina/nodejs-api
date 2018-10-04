const UsersService = require('./users');
const projectService = require('./projects');
const taskService = require('./tasks');
const TokenService = require('./token');
const AuthService = require('./auth');

module.exports = {
    UsersService,
    projectService,
    taskService,
    TokenService,
    AuthService
};