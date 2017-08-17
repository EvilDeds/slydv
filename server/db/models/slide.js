const Sequelize = require('sequelize');
const db = require('../db');

const Slide = db.define('slide', {
  title: {
    type: Sequelize.STRING,
  },
  firstText: {
    type: Sequelize.TEXT,
  },
  secondText: {
    type: Sequelize.TEXT,
  },
  template: {
    type: Sequelize.ENUM('mid-page', 'single-pane', 'columns', 'columns-header', 'repl'),
    defaultValue: 'single-pane',
  },
  codeText: {
    type: Sequelize.TEXT,
  },
  positionInDeck: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
    allowNull: false,
  },
  presenterNotes: {
    type: Sequelize.TEXT
  }
});

module.exports = Slide;
