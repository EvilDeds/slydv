const router = require('express').Router()
const {User, Deck} = require('../db/models')
module.exports = router

// router.get('/:userId', (req, res, next) => {
//   console.log('in route')
//   Deck.findAll({
//     where: {
//       userId: req.params.userId
//     }
//   })
//     .then(decks => res.json(decks))
//     .catch(next)
// })

router.get('/:userId/:deckId', (req, res, next) => {
  Deck.findById(req.params.deckId)
    .then(foundDeck => res.json(foundDeck))
    .catch(next)
})
