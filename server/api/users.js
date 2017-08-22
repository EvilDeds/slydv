const router = require('express').Router();
const { User, Deck } = require('../db/models');
// move to decks? Get userId from req.user for lookup
// if (req.user)
// based on own routing

module.exports = router;

router.put('/:userId/decks/:deckId', (req, res, next) => {
  const deckId = req.params.deckId;
  Deck.findById(deckId)
  .then( deck => deck.update(req.body))
  .then( updated => res.json(updated))
  .catch(next);
})

router.post('/:userId/decks', (req, res, next) => {
  Deck.create(Object.assign({}, req.body, {userId : +req.params.userId}))
  .then( deck => res.json(deck))
  .catch(next);
})

router.get('/:userId/decks', (req, res, next) => {
  Deck.findAll({
    where: {
      userId: Number(req.params.userId),
    },
  })
    .then(decks => res.json(decks))
    .catch(next);
});

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email'],
  })
    .then(users => res.json(users))
    .catch(next);
});


