const {AuthError} = require('@errors/');
const {AuthService} = require('@auth/');

const authenticate = async (req, res, next) => {
    if (!(req.headers && req.headers.authorization)) {
        next(new AuthError('No authorization information was provided'));
        return;
    }

    try {
        req.user = await AuthService.authenticate(req.headers.authorization);
        next();
    }
    catch (e) {
        // TODO: Natalie - is this a good idea to re-throw?
        next(e);
    }
};

const Auth = {
    authenticate
};

module.exports = Auth;