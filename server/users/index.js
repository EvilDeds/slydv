const router = require('express').Router()
module.exports = router
const {Deck} = require('../db/models')

// router.use('/decks', require('./decks'))

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
	console.log('in error handling')
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

