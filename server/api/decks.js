const router = require('express').Router();
const { Deck, Slide, Chat } = require('../db/models');

router.get('/:deckId', (req, res, next) => {
  Deck.findById(+req.params.deckId, { include: [Slide] })
    .then(deck => res.json(deck))
    .catch(next);
});

router.get('/:deckId/chats', (req, res, next) => {
  Chat.findAll({ where: { deckId: +req.params.deckId } })
    .then(chats => res.json(chats))
    .catch(next);
});

router.post('/:deckId/chats', (req, res, next) => {
  Chat.create(req.body)
  .then( (message) => res.json(message))
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
