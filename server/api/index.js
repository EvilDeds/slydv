const router = require('express').Router();

router.use('/decks', require('./decks'));
router.use('/slides', require('./slides'));
router.use('/users', require('./users'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
