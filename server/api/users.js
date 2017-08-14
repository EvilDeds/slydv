const router = require('express').Router()
const {User, Deck} = require('../db/models')
module.exports = router


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

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})
