const router = require('express').Router();
const { Slide, Deck } = require('../db/models');
const Bluebird = require('bluebird');

router.post('/', (req, res, next) => {
  Slide.create(req.body)
    .then(newSlide => {
        res.json(newSlide)
    })
    .catch(next);
});

router.get('/:slideId', (req, res, next) => {
  Slide.findById(req.params.slideId, {include: [{model: Deck, attributes: ['userId', 'viewable']}]})
    .then((foundSlide) => {
      if(foundSlide.deck.userId === req.user.id || foundSlide.deck.viewable ){
        res.json(foundSlide);
      }else{
        next(new Error('this slide is private'))
      }
    })
    .catch(next);
});

router.put('/:slideId', (req, res, next) => {
  
  Slide.findById(req.params.slideId, {include: [{model: Deck, attributes: ['userId']}]})
    .then(slideToUpdate => {
      if(slideToUpdate.deck.userId === req.user.id){
        return slideToUpdate.update(req.body);
      }else{
        next(new Error('this slide cannot be updated'))
      }
    })
    .then(updatedSlide => {
     
      res.json(updatedSlide);
    })
    .catch(next);
});

router.delete('/:slideId', (req, res, next) => { //this route left unsecure because nested promises? 

  Slide.findById(req.params.slideId)
  .then(currSlide => {
    // get all slides after deleted slide
    Deck.findById(+currSlide.deckId, {
      include: [{  model: Slide,  where: { positionInDeck: { $gt: currSlide.positionInDeck } }   }],
      order: [[Slide, 'positionInDeck']]
    })
    .then(deck => {
      // move positionInDeck of each slide up one
      if(deck.userId === req.user.id){
        console.log('you are authorized');
      }else{
        next(new Error('this is not your slide'))
      }
      Bluebird.map(deck.slides, item => {
        let newPos=item.positionInDeck-1;
        // console.log(newPos);
        Slide.update({
          positionInDeck: newPos,
        }, {
          where: {
            id: item.id
          }
        });
      });
    })
    .catch(next);
  })
  .then(()=>{
    return Slide.destroy({ where: { id: req.params.slideId } })
      .then(exSlide => res.json(exSlide))
      .catch(next);
    }
  )
  .catch(next);



});

module.exports = router;
