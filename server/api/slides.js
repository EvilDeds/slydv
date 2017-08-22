const router = require('express').Router();
const { Slide, Deck } = require('../db/models');

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
      // console.log('deckId',currSlide.deckId);
      // res.json(foundSlide)

      Deck.findById(+currSlide.deckId, { include: [Slide], where: positionInDeck > currSlide.positionInDeck, order: [[Slide, 'positionInDeck']] })
      .then(deck => {
        console.log('deck',deck.slides);


      })
      .catch(next);

    }

  )
  .catch(next);


  // Slide.destroy({ where: { id: req.params.slideId } })
  //   .then(exSlide => res.json(exSlide))
  //   .catch(next);
});

module.exports = router;
