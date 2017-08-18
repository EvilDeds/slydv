const router = require('express').Router();
const { Deck, Slide } = require('../db/models');

router.post('/', (req, res, next) => {
  console.log('POST /api/slides/: req.body:', req.body);
  Slide.create(req.body)
    .then(newSlide => res.json(newSlide))
    .catch(next);
});

router.get('/:slideId', (req, res, next) => {
  Slide.findById(req.params.slideId, { include: [Deck] })
    .then(foundSlide => {
      console.log('foundSlide:', foundSlide);
      res.json(foundSlide)
    })
    .catch(next);
});

router.put('/:slideId', (req, res, next) => {
  Slide.findById(req.params.slideId)
    .then(slideToUpdate => {
      return slideToUpdate.update(req.body);
    })
    .then(updatedSlide => {
      res.json(updatedSlide);
    })
    .catch(next);
});

router.delete('/:slideId', (req, res, next) => {
  Slide.destroy({ where: { id: req.params.slideId } })
    .then(exSlide => res.json(exSlide))
    .catch(next);
});

module.exports = router;
