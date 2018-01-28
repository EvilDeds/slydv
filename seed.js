const Bluebird = require('bluebird');
const db = require('./server/db');
const { User, Deck, Slide } = require('./server/db/models');

const defaultUser = [
  { email: 'test@gmail.com', password: '1234' },
];

const defaultDeck = [
  { deckTitle: 'Deck Number One', viewable: true, theme: 'swiss', hasFooter: true, footerText: '[@deckmistress](https://twitter.com/deckmistress) | [mistress@slydv.com](mailto:mistress@slydv.com?Deck Number One) | [#slydv](https://twitter.com/hashtag/slydv?src=hash)', userId: 1 },
  { deckTitle: 'Deck Number Two', viewable: true, theme: 'ulysses', hasFooter: true, footerText: 'This is a _footer_ with _italics_!', userId: 1 },
  { deckTitle: 'Deck Theme Sample', viewable: true, theme: 'antique', hasFooter: true, footerText: 'SLYDV Footer', userId: 1 },
  { deckTitle: 'Binary Operators', viewable: true, theme: 'ulysses', hasFooter: true, footerText: 'SLYDV - Slides for Developers', userId: 1 },
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


  { title: 'Binary Intro', firstText: '# Binary \n --- \n ## There are ``10`` types of people in the world. \n ### Those who understand Binary... \n ### And those who don\'t! \n # ![Binary](https://digitalrightsfoundation.pk/wp-content/uploads/2017/06/Page-Cover.gif)', secondText: 'My second text', template: 'single-pane', codeText: 'XXXX', positionInDeck: 1, presenterNotes: 'In a binary system the brightest object is referred to as primary, and the other the secondary.\n' +
  '\n' +
  'They are also classified based on orbit. Wide binaries are objects with orbits that keep them a part from one another. They evolve separately and have very little effects on each other. Close binaries are close to each other and are able to transfer mass from one another.', deckId: '4' },

  { title: 'Bitwise Operators', firstText: '![Bitwise Operators](https://brookieboo143.files.wordpress.com/2012/09/04-binary-base1.png)', secondText: '![Bitwise Operators](http://i.imgur.com/YXZvQEj.jpg) \n ####  __AND__ ``&``  __OR__ ``|``  __XOR__ ``^`` Left Shift ``<<`` Right Shift ``>>``', template: 'columns-header', codeText: '\/\/Binary Operations\r\n\/\/Implement a function that adds two numbers \r\n\/\/without using + or any other built-in arithmetic operators.\r\n\r\n  function add (a, b) {\r\n    while (b !== 0) {\r\n      const uncarried = a ^ b;\r\n      const carries = (a & b) << 1;\r\n      a = uncarried;\r\n      b = carries;\r\n    }\r\n    return a;\r\n  }\r\n\r\n  add(19,7);', positionInDeck: 2, presenterNotes: 'Eclipsing binaries are where the object\'s orbits are at an angle that when one passes in front of the other it causes an eclipse, as seen from Earth.\n', deckId: '4' },

  { title: '8-bit Binary', firstText: '# 8-bit Binary\r\n\r\n---\r\n\r\n#### Hello! This is my name is 01000001 01101100 01101001 01100011 01100101!\r\n\r\nBinary code is a system of representing numbers, letters, commands, images and sounds. Amazingly, it uses only two types of information to do this \u2013 1 and 0. The strings of 1\u2019s and 0\u2019s that make up binary code may seem random, but of course they\u2019re not.\r\n\r\nBinary code is at the absolute heart of anything that goes on inside a computer \u2013 and yet it\u2019s something that most code tutorials don\u2019t cover.\r\n\r\nHere\u2019s an explanation of the fundamentals of binary. At the end you should have a basic idea of what all those 1s and 0s mean.\r\n\r\n#### Binary Numbers\r\n\r\nThe binary number system is a base-two system, meaning it uses two distinct digits \u2013 0 and 1. The decimal number system we\u2019re all familiar with is a base-ten system, meaning it uses ten distinct digits \u2013 0 and 1, but also 2, 3, 4, 5, 6, 7, 8 and 9.\r\n\r\nCounting in the decimal system, when all ten digits have been exhausted, the next number is represented as \u201910\u2019. In the binary system, it\u2019s the exact same. After 0 and 1 comes 10.\r\n\r\n---\r\n\r\n>\u201CComputers, it is often said, manipulate symbols. They don\u2019t deal with numbers directly, but with symbols that can represent not only numbers but also words and pictures. Inside the circuits of the digital computer these symbols exist in electrical form, and there are just two basic symbols \u2013 a high voltage and a low voltage. Clearly, this is a marvelous kind of symbolism for a machine; the circuits don\u2019t have to distinguish between nine different shades of gray but only between black and white, or in electrical terms, between high and low voltages.\u201D --Copyright \u00A9 1981 by John Tracy Kidder. Reprinted by permission of Little, Brown and Company, New York, NY. All rights reserved.\n', secondText: 'My second text', template: 'single-pane', codeText: 'XXXX', positionInDeck: 3, presenterNotes: 'Presenter Notes with __Markdown__\r\n\r\nTake a look through the key below and try to spell something using UTF-8 binary code. Try your name! Find the 8-bit binary code sequence for each letter of your name, writing it down with a small space between each set of 8 bits. For example, if your name starts with the letter A, your first letter would be 01000001.', deckId: '4' },

  { title: 'Binary Operators', firstText: '### Binary Operators\r\nImplement a function that adds two numbers without using + or any other built in arithmetic operators.\r\n\r\n```\r\n     1 <= carried\r\n    10\r\n  + 11\r\n  ----\r\n   101\r\n```\r\n#### Recursive Solution\r\n```\r\nconst add = (a, b) => {\r\n  \/\/ Base case is that there is no more uncarried value.\r\n  if (b === 0) return a;\r\n  \/\/ Grab the raw bit addition through XOR\r\n  const carried = a ^ b;\r\n  \/\/ Check to see if there are any \'collisions\' aka carry overs\r\n  const uncarried = (a & b) << 1;\r\n  \/\/ Call add again with new values\r\n  return add(carried, uncarried);\r\n}\r\n\r\nconst promAdd = (a, b) => b === 0 ? a : promAdd(a ^ b, (a & b) << 1);\r\n```', secondText: 'My second text', template: 'repl', codeText: '\/\/ Binary Operators\r\n\/\/ Iterative Solution\r\n\r\nfunction add (a, b) {\r\n  while (b !== 0) {\r\n    const uncarried = a ^ b;\r\n    const carries = (a & b) << 1;\r\n    a = uncarried;\r\n    b = carries;\r\n  }\r\n  return a;\r\n}\r\n\r\nadd(19,7);\n', positionInDeck: 4, presenterNotes: 'An optimized solution would make use of bitwise operations. There are a number of ways we might do this. The important thing to keep in mind is that addition works much the same way with binary numbers as it does with decimal numbers. That is:\n We can add columns from right to left and carry a 1 to the next column if the previous column adds to 10 or greater. In our case 10 is not "ten" though, it\'s "two". So if we have two ones in a column it will result in a 0 below it and a 1 carried over to the next column.', deckId: '4' },




];

db.sync({ force: true })
  .then(() => Bluebird.map(defaultUser, item => User.create(item)))
  .then(() => Bluebird.map(defaultDeck, item => Deck.create(item)))
  .then(() => Bluebird.map(defaultSlide, item => Slide.create(item)))
  .then(() => console.log('hey, it seeded!'))
  .catch(err => console.log('err seeding', err))
  .finally(() => {
    db.close();
    console.log('connection closed!');
  });