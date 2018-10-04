const jwt = require('jsonwebtoken');
const {AuthError} = require('@errors/');
const config = require('config');

const encode = async userInfo => {
    return jwt.sign(userInfo, config.auth.secret, { expiresIn: config.auth.tokenLife})
}

const decode = async token => {
    try {
        return jwt.verify(token, config.auth.secret);
    }
    catch (e) {
        throw new AuthError('Invalid token was provided', e);
    }
};

const TokenService = {
    encode,
    decode
};

module.exports = TokenService;