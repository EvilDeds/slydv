const Chat = require('./chat');
const Deck = require('./deck');
const Slide = require('./slide');
const User = require('./user');

Chat.belongsTo(User);

Chat.belongsTo(Deck);
Deck.hasMany(Chat);

Slide.belongsTo(Deck);
Deck.hasMany(Slide);

Deck.belongsTo(User);
User.hasMany(Deck);

module.exports = {
  Chat,
  Deck,
  Slide,
  User,
};
