const Sequelize = require('sequelize');
const db = require('../db');

const Slide = db.define('slide', {
  title: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.TEXT,
  },
  isRepl: {
    type: Sequelize.BOOLEAN,
  },
  codeText: {
    type: Sequelize.TEXT,
  },
  isHead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  nextId: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  prevId: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  // Change from prevId and nextId to positionInDeck prop
  // Then can view what slide it is
  // Also remove isHead then -> get from index in deck
  // Add enum field for slide template

});

module.exports = Slide;
