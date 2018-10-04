const TokenService = require('@services/token');
const UsersService = require('@services/users');
const {AuthError} = require('@errors/');

const authenticate = async authInfo => {
    if (authInfo.split(' ')[0] !== 'Bearer') {
        throw new AuthError('Server supports only Bearer-authentication');
    }

    try {
        return TokenService.decode(authInfo.split(' ')[1]);
        // next();
    }
    catch (e) {
        // TODO: Natalie - is this a good idea to re-throw?
        throw e;
    }
};

const signIn = async signInInfo => {
    const existingUsers = await UsersService.find({email: signInInfo.email});
    if(!existingUsers || existingUsers.length !== 1) {
        throw new AuthError("User with such credentials doesn't exist");
    }

    // TODO: Natalie - compare encoded password
    const user = existingUsers[0];
    if(user.password !== signInInfo.password) {
        throw new AuthError("User with such credentials doesn't exist");
    }

    return TokenService.encode({_id: user._id});
};

const register = async registrationInfo => {
    // TODO: Natalie - encode password
    const existingUsers = await UsersService.find({email: registrationInfo.email});
    if(existingUsers && existingUsers.length > 0) {
        throw new AuthError("User with such credentials already exists");
    }

    const encodedPassword = registrationInfo.password;
    const user = await UsersService.add({email: registrationInfo.email, password: encodedPassword});
    return user;
};

const AuthService = {
    authenticate,
    signIn,
    register
};

module.exports = AuthService;