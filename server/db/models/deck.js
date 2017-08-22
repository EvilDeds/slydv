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
  theme: {
    type: Sequelize.ENUM,
    values: ['red', 'green', 'blue'],
    defaultValue: 'red',
  },
  hasFooter: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Deck;
