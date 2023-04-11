const bcrypt = require("bcrypt");

// returns promise of hash value
const encrypt = async (value) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value.toString(), salt);
};

// returns promise of boolean
const compare = async (plainValue, hashedValue) => {
  return await bcrypt.compare(plainValue.toString(), hashedValue);
};

module.exports = { encrypt, compare };
