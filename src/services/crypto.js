const bcrypt = require('bcrypt');

const encode = async (data, salt) => {
  return bcrypt.hash(data, salt);
};

const compare = async (data, encodedData, salt) => {
    return bcrypt.compare()
}
