const router = require('express').Router();
const { Slide } = require('../db/models');

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
      if (slideToUpdate.userId === req.user.id){
        return slideToUpdate.update(req.body);
      }else{
        next(new Error('you cannot update this slide'))
      }
    })
    .then(updatedSlide => {
      // console.log('updatedSlide:', updatedSlide);
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
