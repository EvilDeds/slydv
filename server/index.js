const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const socketio = require('socket.io');
const db = require('./db');

const PORT = process.env.PORT || 8080;
const app = express();
const sessionStore = new SequelizeStore({ db });

module.exports = app;

if (process.env.NODE_ENV !== 'production') require('../secrets');

// passport registration
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done));

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // auth and api routes
  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));
  // app.use('/users', require('./users'));

  // static file-serving middleware
  app.use('/deque-pattern-library', express.static(path.join(__dirname, '..', '/node_modules/deque-pattern-library/dist')));
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use('/bootstrap', express.static(path.join(__dirname, '..', '/node_modules/bootstrap/dist')));

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));

  // set up our socket control center
  const io = socketio(server);
  require('./socket')(io);
};

const syncDb = () => db.sync({ force: false });

// This evaluates as true when this file is run directly from the
// command line—e.g., when we say 'node server/index.js' (or
// 'nodemon server/index.js', or 'nodemon server', etc.). It will
// evaluate false when this module is required by another module—
// e.g., if we require our app in a test spec.
if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening);
} else {
  createApp();
}
