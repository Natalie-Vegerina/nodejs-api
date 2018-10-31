const TokenService = require('./token');
const {UsersService} = require('@services/');
const Crypto = require('./crypto');
// const {TokenService, UsersService, Crypto} = require('@services');
// const {TokenService, Crypto} = require('./');
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

    // TODO: Natalie - compare encoded password - done
    const user = existingUsers[0];
    const result = await Crypto.compare(signInInfo.password, user.password);
    if(!result) {
        throw new AuthError("User with such credentials doesn't exist");
    }

    return TokenService.encode({_id: user._id});
};

const register = async registrationInfo => {
    const existingUsers = await UsersService.find({email: registrationInfo.email});
    if(existingUsers && existingUsers.length > 0) {
        throw new AuthError("User with such credentials already exists");
    }

    // TODO: Natalie - encode password - done
    const encodedPassword = await Crypto.encrypt(registrationInfo.password);
    return UsersService.add({email: registrationInfo.email, password: encodedPassword});
};

const AuthService = {
    authenticate,
    signIn,
    register
};

module.exports = AuthService;