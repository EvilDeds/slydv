const Bluebird = require('bluebird');
const db = require('./server/db');
const { Deck, Slide, User } = require('./server/db/models');

const defaultUser = [
  { email: 'test@gmail.com', password: '1234' },
];

const defaultDeck = [
  { deckTitle: 'Deck Number One', viewable: true, theme: 'swiss', hasFooter: true, footerText: '[@deckmistress](https://twitter.com/deckmistress) | [mistress@slydv.com](mailto:mistress@slydv.com?Deck Number One) | [#slydv](https://twitter.com/hashtag/slydv?src=hash)', userId: 1 },
  { deckTitle: 'Deck Number Two', viewable: true, theme: 'ulysses', hasFooter: true, footerText: 'This is a _footer_ with _italics_!', userId: 1 },
  { deckTitle: 'Deck Theme Sample', viewable: true, theme: 'antique', hasFooter: true, footerText: 'SLYDV Footer', userId: 1 },
];

const defaultSlide = [
  { title: 'Slide 1', firstText: ' My first text', secondText: 'My second text', template: 'mid-page', codeText: 'console.log(\'hi\');', positionInDeck: 1, presenterNotes: 'Presenter Notes', deckId: '1' },
  { title: 'Slide 2', firstText: ' My first text', secondText: 'My second text', template: 'single-pane', codeText: 'console.log(\'hi\');', positionInDeck: 2, presenterNotes: 'Presenter Notes', deckId: '1' },
  { title: 'Slide 3', firstText: ' My first text', secondText: 'My second text', template: 'columns', codeText: 'console.log(\'hi\');', positionInDeck: 3, presenterNotes: 'Presenter Notes', deckId: '1' },
  { title: 'Slide 4', firstText: ' My first text', secondText: 'My second text', template: 'columns-header', codeText: 'console.log(\'hi\');', positionInDeck: 4, presenterNotes: 'Presenter Notes', deckId: '1' },
  { title: 'Slide 5', firstText: ' My first text', secondText: 'My second text', template: 'repl', codeText: 'console.log(\'hi\');', positionInDeck: 5, presenterNotes: 'Presenter Notes', deckId: '1' },

  { title: 'Slide 1', firstText: ' My first text', secondText: 'My second text', template: 'mid-page', codeText: 'console.log(\'hi\');', positionInDeck: 1, presenterNotes: 'Presenter Notes', deckId: '2' },
  { title: 'Slide 2', firstText: ' My first text', secondText: 'My second text', template: 'single-pane', codeText: 'console.log(\'hi\');', positionInDeck: 2, presenterNotes: 'Presenter Notes', deckId: '2' },
  { title: 'Slide 3', firstText: ' My first text', secondText: 'My second text', template: 'columns', codeText: 'console.log(\'hi\');', positionInDeck: 3, presenterNotes: 'Presenter Notes', deckId: '2' },
  { title: 'Slide 4', firstText: ' My first text', secondText: 'My second text', template: 'columns-header', codeText: 'console.log(\'hi\');', positionInDeck: 4, presenterNotes: 'Presenter Notes', deckId: '2' },
  { title: 'Slide 5', firstText: ' My first text', secondText: 'My second text', template: 'repl', codeText: 'console.log(\'hi\');', positionInDeck: 5, presenterNotes: 'Presenter Notes', deckId: '2' },

  { title: 'Slide 1', firstText: '# Heading 1 \n ## Heading 2 \n ### Heading 3 \n #### Heading 4 \n ##### Heading 5', secondText: 'My second text', template: 'single-pane', codeText: 'console.log(\'hi\');', positionInDeck: 1, presenterNotes: 'Presenter Notes', deckId: '3' },
  { title: 'Slide 2', firstText: '![m\'lady](http://i.imgur.com/v8IVDka.jpg)', secondText: 'My second text', template: 'single-pane', codeText: 'console.log(\'hi\');', positionInDeck: 2, presenterNotes: 'Presenter Notes', deckId: '3' },
  { title: 'Slide 3', firstText: 'Paragraphs are separated by a blank line. \n  Two spaces at the end of a line leave a \n\n line break. \n Text attributes _italic_, *italic*, __bold__, **bold**, `monospace`. \n Horizontal rule: \n --- \n A [link](http://example.com).', secondText: 'My second text', template: 'single-pane', codeText: 'console.log(\'hi\');', positionInDeck: 3, presenterNotes: 'Presenter Notes', deckId: '3' },
  { title: 'Slide 4', firstText: 'This is some text \n  --- \n This is some text \n ___ \n This is some text', secondText: 'My second text', template: 'single-pane', codeText: 'console.log(\'hi\');', positionInDeck: 4, presenterNotes: 'Presenter Notes', deckId: '3' },
];

db.sync({ force: true })
  .then(() => Bluebird.map(defaultUser, item => User.create(item)))
  .then(() => Bluebird.map(defaultDeck, item => Deck.create(item)))
  .then(() => Bluebird.map(defaultSlide, item => Slide.create(item)))
  .then(() => console.log('hey, it seeded!'))
  .catch(err => console.log('error while seeding :(', err))
  .finally(() => {
    db.close();
    console.log('connection closed!');
  });
