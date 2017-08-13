const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router


router.get('/:userId/decks', (req, res,next) =>{
	let userId = req.params.userId
	if (req.user.id === userId){
		Deck.findAll({
		where : {
			userId : userId
			}
		})
		.then(decks => res.json(decks))
		.catch(next)
	} else{
		next(new Error('you are not authorized to view this page'))
	}
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
