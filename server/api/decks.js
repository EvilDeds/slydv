const router = require('express').Router();
const { Deck, Slide, Chat, User } = require('../db/models');

router.get('/:deckId', (req, res, next) => {
  Deck.findById(+req.params.deckId, { include: [Slide], order: [[Slide, 'positionInDeck']] })
    .then(deck => res.json(deck))
    .catch(next);
});

router.get('/:deckId/chats', (req, res, next) => {
  Chat.findAll({ where: { deckId: +req.params.deckId } , include: [ { model: User, attributes: ['email']}] })
    .then(chats => res.json(chats))
    .catch(next);
});

router.post('/:deckId/chats', (req, res, next) => {
  Chat.create(req.body)
  .then( (message) => {
    return Chat.findById(message.id, {include: [ { model: User, attributes: [ 'email' ]} ]})
  })
  .then(messageWithUser => res.json(messageWithUser))
  .catch(next);
})

router.get('/:deckId/slides', (req, res, next) => {
  Slide.findAll({
    where: { deckId: +req.params.deckId },
    order: [['positionInDeck', 'ASC']],
  })
    .then(slides => res.json(slides))
    .catch(next);
});

module.exports = router;


