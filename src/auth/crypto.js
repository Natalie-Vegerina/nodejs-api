const bcrypt = require('bcrypt');

const encrypt = async (data, salt) => {
  return bcrypt.hash(data, salt || 10);
};

const compare = async (data, encryptedData) => {
    return bcrypt.compare(data, encryptedData);
};

const Crypto = {
    encrypt,
    compare
};

module.exports = Crypto;