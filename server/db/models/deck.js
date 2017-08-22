const Sequelize = require('sequelize');
const db = require('../db');

const Deck = db.define('deck', {
  deckTitle: {
    type: Sequelize.STRING,
    defaultValue: 'Untitled Deck',
  },
  viewable: {
    type: Sequelize.BOOLEAN,
  },
  chats: {
    type: Sequelize.TEXT,
  },
  theme: {
    type: Sequelize.ENUM,
    values: ['red', 'green', 'blue'],
    defaultValue: 'red',
  },
  hasFooter: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  footerText: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },
});

module.exports = Deck;
