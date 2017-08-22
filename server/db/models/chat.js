const Sequelize = require('sequelize');
const db = require('../db');

const Chat = db.define('chat', {
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Chat;
