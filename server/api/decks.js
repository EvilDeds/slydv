const router = require('express').Router();
const { Deck, Slide, Chat, User } = require('../db/models');

router.get('/:deckId', (req, res, next) => {
  Deck.findById(+req.params.deckId, { include: [Slide], order: [[Slide, 'positionInDeck']] })
    .then((deck) => {
      if (deck.userId === req.user.id || deck.viewable){
        res.json(deck)
      }else{
        next(new Error('You cannot view this deck.'))
      }
    })
    .catch(next);
});

router.get('/:deckId/chats', (req, res, next) => {
  Chat.findAll({ where: { deckId: +req.params.deckId } , include: [ { model: User, attributes: ['email']}, { model: Deck, attributes: ['userId','viewable']}], order: [['createdAt']] })
    .then((chats) => {
      if(!chats.length){res.json(chats)
      }else if (chats[0].deck.userId === req.user.id || chats[0].deck.viewable){
        res.json(chats)
      }else{
        next(new Error('these chats are private'))
      }

    })
    .catch(next);
});
router.delete ('/:deckId/chats', (req, res, next) => {
  Chat.findAll({where: {deckId : +req.params.deckId}, include: [ {model: Deck, attributes: ['userId']}]})
  .then((chats) => {
    if(chats[0].deck.userId === req.user.id){
      return Chat.destroy({where: {deckId : +req.params.deckId}})
    }else{
      next(new Error('these are not your chats'))
    }
  })
  .then((exChats) => {
    res.json(exChats)})
  .catch(next)
})

router.post('/:deckId/chats', (req, res, next) => {
  Chat.create(req.body)
  .then( (message) => {
    return Chat.findById(message.id, { include: [ { model: User, attributes: [ 'email' ]}, { model: Deck, attributes: ['userId', 'viewable']} ]})
  })
  .then((messageWithUser) => {
    if(messageWithUser.deck.userId === req.user.id || messageWithUser.deck.viewable){
      res.json(messageWithUser);
    }else{
      next(new Error('you cannot send chats here'))
    }
  })
  .catch(next);
})

router.get('/:deckId/slides', (req, res, next) => {
  Slide.findAll({
    where: { deckId: +req.params.deckId },
    order: [['positionInDeck', 'ASC']],
    include: [ {model: Deck, attributes: ['userId', 'viewable']}]
  })
    .then((slides) => {
      if (slides[0].deck.userId === req.user.id || slides[0].deck.viewable){
        res.json(slides);
      }else{
        next(new Error('these slides are private'))
      }
    })
    .catch(next);
});

module.exports = router;


