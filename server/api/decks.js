const router = require('express').Router();
const { Deck, Slide } = require('../db/models');

router.get('/:deckId/slides', (req, res, next) => {
  Slide.findAll({
    where: { deckId: +req.params.deckId },
    order: [['positionInDeck', 'ASC']],
  })
    .then(slides => res.json(slides))
    .catch(next);
});

router.get('/:deckId', (req, res, next) => {
  Deck.findById(+req.params.deckId, { include: [Slide] })
    .then(deck => res.json(deck))
    .catch(next);
});


module.exports = router;
