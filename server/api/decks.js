const router = require('express').Router();
const { Deck, Slide } = require('../db/models');

router.get('/:deckId/slides', (req, res, next) => {
  Slide.findAll({ where: { deckId: +req.params.deckId } })
    .then(slides => res.json(slides))
    .catch(next);
});

router.get('/:deckId', (req, res, next) => {
  console.log('in get deck backend');
  Deck.findById(+req.params.deckId)
    .then(deck => res.json(deck))
    .catch(next);
});


module.exports = router;
