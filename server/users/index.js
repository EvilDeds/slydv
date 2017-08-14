const router = require('express').Router();

module.exports = router;

router.use('/:userId/decks', require('./decks'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
