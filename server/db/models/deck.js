const Sequelize = require('sequelize');
const db = require('../db');

const Deck = db.define('deck', {
// Add default title
  deckTitle: {
    type: Sequelize.STRING,
  },
  viewable: {
    type: Sequelize.BOOLEAN,
  },
  chats: {
    type: Sequelize.TEXT,
  },
});

module.exports = Deck;
