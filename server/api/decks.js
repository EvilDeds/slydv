const router = require('express').Router();
const { Deck, Slide } = require('../db/models');

router.get('/:deckId', (req, res, next) => {
  Deck.findById(+req.params.deckId, { include: [Slide] })
  .then(deck => {
    if(req.user.id === deck.userId || deck.viewable ){
      res.json(deck)
	}else{
     next(new Error('This deck is not for you!'))
	}
  })
  .catch(next)
});

router.get('/:deckId/slides', (req, res, next) => {
  Deck.findById(+req.params.deckId)
  .then(deck => {
  	if(req.user.id === deck.userId || deck.viewable ){
      Slide.findAll({
      where: { deckId: +req.params.deckId },
      order: [['positionInDeck', 'ASC']],
      })
    .then(slides => res.json(slides))
    .catch(next);
  	}else{
      next(new Error('These slides are not for you!'))
  	}
  })

}); //the relevant security params here are on the deck not the slides, what should we do? 

module.exports = router;


