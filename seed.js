'use strict';

const db = require('./server/db');
const {User, Deck, Slide} = require('./server/db/models');

// const User = db.models.User;
// const Deck = db.models.Deck;
// const Slide = db.models.Slide;
const Bluebird = require('bluebird');


const defaultUser=[
  { email: 'test@gmail.com', password: '1234' },
];

const defaultDeck=[
  { deckTitle: 'Deck Number One', viewable: true, chats: 'Chat Text', theme: 'red', hasFooter: true, userId:1 },
  { deckTitle: 'Deck Number Two', viewable: true, chats: 'Chat Text', theme: 'red', hasFooter: true, userId:1 },
];

const defaultSlide=[
  { title: 'Slide 1', firstText: ' My first text', secondText: 'My second text', template: 'mid-page', codeText: 'console.log(\'hi\');', positionInDeck: 1, presenterNotes: 'Presenter Notes', deckId: '1' },
  { title: 'Slide 2', firstText: ' My first text', secondText: 'My second text', template: 'single-pane', codeText: 'console.log(\'hi\');', positionInDeck: 2, presenterNotes: 'Presenter Notes', deckId: '1' },
  { title: 'Slide 3', firstText: ' My first text', secondText: 'My second text', template: 'columns', codeText: 'console.log(\'hi\');', positionInDeck: 3, presenterNotes: 'Presenter Notes', deckId: '1' },
  { title: 'Slide 4', firstText: ' My first text', secondText: 'My second text', template: 'columns-header', codeText: 'console.log(\'hi\');', positionInDeck: 4, presenterNotes: 'Presenter Notes', deckId: '1' },
  { title: 'Slide 5', firstText: ' My first text', secondText: 'My second text', template: 'repl', codeText: 'console.log(\'hi\');', positionInDeck: 5, presenterNotes: 'Presenter Notes', deckId: '1' },

  { title: 'Slide 1', firstText: ' My first text', secondText: 'My second text', template: 'mid-page', codeText: 'console.log(\'hi\');', positionInDeck: 1, presenterNotes: 'Presenter Notes', deckId: '2' },
  { title: 'Slide 2', firstText: ' My first text', secondText: 'My second text', template: 'single-pane', codeText: 'console.log(\'hi\');', positionInDeck: 2, presenterNotes: 'Presenter Notes', deckId: '2' },
  { title: 'Slide 3', firstText: ' My first text', secondText: 'My second text', template: 'columns', codeText: 'console.log(\'hi\');', positionInDeck: 3, presenterNotes: 'Presenter Notes', deckId: '2' },
  { title: 'Slide 4', firstText: ' My first text', secondText: 'My second text', template: 'columns-header', codeText: 'console.log(\'hi\');', positionInDeck: 1, presenterNotes: 'Presenter Notes', deckId: '2' },
  { title: 'Slide 5', firstText: ' My first text', secondText: 'My second text', template: 'repl', codeText: 'console.log(\'hi\');', positionInDeck: 4, presenterNotes: 'Presenter Notes', deckId: '2' },
];





db.sync({ force: true })
  .then(() => {
    return Bluebird.map(defaultUser, item => {
      return User.create(item);
    });
  })
  .then(() => {
    return Bluebird.map(defaultDeck, item => {
      return Deck.create(item);
    });
  })
  .then(() => {
    return Bluebird.map(defaultSlide, item => {
      return Slide.create(item);
    });
  })
  .then(() => {
    console.log('hey it seeded!');
  })
  .catch(err => {
    console.log('err seeding', err);
  })
  .finally(() => {
    db.close();
    console.log('connection closed!');
  });

