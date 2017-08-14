
const router = require('express').Router();

const {Deck} = require('../db/models')

module.exports = router;

router.get('/:userId/decks', (req, res, next) => {
  console.log('in route')
  Deck.findAll({
    where: {
      userId: +req.params.userId
    }
  })
    .then(decks => res.json(decks))
    .catch(next)
})

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

