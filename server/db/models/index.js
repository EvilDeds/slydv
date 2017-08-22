const User = require('./user');
const Deck = require('./deck');
const Slide = require('./slide');
const Chat = require('./chat');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Deck.belongsTo(User);
User.hasMany(Deck);
Slide.belongsTo(Deck);
Deck.hasMany(Slide);

Chat.belongsTo(User);

Chat.belongsTo(Deck);
Deck.hasMany(Chat);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Deck, Slide, Chat,
};
