const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  googleId: {
    type: Sequelize.STRING,
  },
});

/* ---------------------- instanceMethods ---------------------- */

User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password;
};

/* ------------------------ classMethods ----------------------- */

User.generateSalt = () => crypto.randomBytes(16).toString('base64');

User.encryptPassword = (plainText, salt) =>
  crypto.createHash('sha1').update(plainText).update(salt).digest('hex');

/* --------------------------- hooks --------------------------- */

const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
