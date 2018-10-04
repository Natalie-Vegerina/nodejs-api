const TokenService = require('@services/token');
const UsersService = require('@services/users');

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
    return TokenService.encode({_id: signInInfo._id});
};

const register = async registrationInfo => {
    // TODO: Natalie - encode password
    const encodedPassword = registrationInfo.password;
    const user = await UsersService.add({email: registrationInfo.email, password: encodedPassword});
    return await signIn(user);
};

const AuthService = {
    authenticate,
    signIn,
    register
};

module.exports = AuthService;