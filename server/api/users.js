const router = require('express').Router();
const { User, Deck } = require('../db/models');

module.exports = router;

router.put('/:userId/decks/:deckId', (req, res, next) => {
  const deckId = req.params.deckId;
  Deck.findById(deckId)
    .then((deck) => {
      if (deck.userId === req.user.id) {
        return deck.update(req.body);
      }
      next(new Error('this is not your deck to update'));
    })
    .then(updated => res.json(updated))
    .catch(next);
});

router.post('/:userId/decks', (req, res, next) => {
  Deck.create(Object.assign({}, req.body, { userId: +req.params.userId }))
    .then((deck) => {
      if (deck.userId === req.user.id) {
        res.json(deck);
      } else {
        next(new Error('deck cannot be created here'));
      }
    })
    .catch(next);
});

router.get('/:userId/decks', (req, res, next) => {
  Deck.findAll({
    where: {
      userId: Number(req.params.userId),
    },
  })
    .then((decks) => {
      res.json(decks.filter(deck => deck.userId === req.user.id || deck.viewable));
    })
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


