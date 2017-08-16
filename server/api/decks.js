const router = require('express').Router();
const { Slide } = require('../db/models');

router.get('/:deckId/slides', (req, res, next) => {
  Slide.findAll({ where: { deckId: +req.params.deckId } })
    .then(slides => res.json(slides))
    .catch(next);
})


module.exports = router;
