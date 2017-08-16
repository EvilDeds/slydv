const Sequelize = require('sequelize');
const db = require('../db');

const Slide = db.define('slide', {
  title: {
    type: Sequelize.STRING,
  },
  text: {
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

const autoTitle = (slide) => {
  if (!slide.title) {
    slide.title = `Slide #${slide.positionInDeck}`;
  }
};

Slide.beforeCreate(autoTitle);
Slide.beforeUpdate(autoTitle);
module.exports = Slide;
