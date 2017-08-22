const router = require('express').Router();
const { Deck, Slide } = require('../db/models');

router.get('/:deckId', (req, res, next) => {
  Deck.findById(+req.params.deckId, { include: [Slide], order: [[Slide, 'positionInDeck']] })
    .then(deck => res.json(deck))
    .catch(next);
});

router.get('/:deckId/slides', (req, res, next) => {
  Slide.findAll({
    where: { deckId: +req.params.deckId },
    order: [['positionInDeck', 'ASC']],
  })
    .then(slides => res.json(slides))
    .catch(next);
});

module.exports = router;
