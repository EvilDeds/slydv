const router = require('express').Router();
const { Deck } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Deck.findAll({
    where: {
      userId: req.params.userId,
    },
  })
    .then(decks => res.json(decks))
    .catch(next);
});

router.get('/:deckId', (req, res, next) => {
  Deck.findById(req.params.deckId)
    .then(foundDeck => res.json(foundDeck))
    .catch(next);
});
