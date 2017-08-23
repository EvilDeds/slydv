const router = require('express').Router();
const { Slide, Deck } = require('../db/models');
const Bluebird = require('bluebird');

router.post('/', (req, res, next) => {
  Slide.create(req.body)
    .then(newSlide => res.json(newSlide))
    .catch(next);
});

router.get('/:slideId', (req, res, next) => {
  Slide.findById(req.params.slideId)
    .then(foundSlide => res.json(foundSlide))
    .catch(next);
});

router.put('/:slideId', (req, res, next) => {
  // console.log('req.params.slideId:', req.params.slideId);
  Slide.findById(req.params.slideId)
    .then(slideToUpdate => {
      // console.log('slideToUpdate:', slideToUpdate);
      return slideToUpdate.update(req.body);
    })
    .then(updatedSlide => {
      // console.log('updatedSlide:', updatedSlide);
      res.json(updatedSlide);
    })
    .catch(next);
});

router.delete('/:slideId', (req, res, next) => {
  Slide.findById(req.params.slideId)
  .then(currSlide => {
    // get all slides after deleted slide
    Deck.findById(+currSlide.deckId, {
      include: [{  model: Slide,  where: { positionInDeck: { $gt: currSlide.positionInDeck } }   }],
      order: [[Slide, 'positionInDeck']]
    })
    .then(deck => {
      // move positionInDeck of each slide up one
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
  // .then(destroyedSlide =>{
  //   console.log('destroyed slide',destroyedSlide.deckId);
  // })
  .catch(next);



});

module.exports = router;
