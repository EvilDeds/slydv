/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server/index');

const User = db.model('user');
const Deck = db.model('deck');

describe('User routes', () => {
  beforeEach(() => db.sync({ force: true }));

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';
    const deckTitle = 'what a great deck';

    beforeEach(() => User.create({ email: codysEmail })
       .then(() => Deck.create({ deckTitle , userId : 1}))
      );
    

    it ('GET /api/users', () =>
      request(app)
        .get('/api/users')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(codysEmail);
        }));

    it ('GET /api/users/:userId/decks', () =>
      request(app)
        .get('/api/users/1/decks')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].deckTitle).to.be.equal(deckTitle);
        })
      );

    it ('POST /api/users/:userId/decks', () => 
      request(app)
       .post('/api/users/1/decks')
       .send({
        deckTitle : 'its a beautiful day to make a new deck', 
        userId : 1
       })
       .expect(200)
       .then(() => {
          return Deck.findOne({
           where : { deckTitle : 'its a beautiful day to make a new deck'}
         })}
        )
       .then( (newDeck) => {
         expect(newDeck).to.exist;
         expect(newDeck.deckTitle).to.equal('its a beautiful day to make a new deck')
       })
      );

    describe ('PUT  /api/users/:userId/decks/:deckId', () => {
      const catMail = 'meowmeom@kitty.com';
      const deckTitle = 'i wish we could update this deck';

      beforeEach(() => User.create({ email: catMail })
       .then(() => Deck.create({ deckTitle , userId : 1}))
      );

      it ('updates a deck', () => {
        request(app)
        .put('/api/users/1/decks/1')
        .send( {
          deckTitle : 'it is so great that we updated'
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.deckTitle).to.be.equal('it is so great that we updated')
        })
      })

    })
  });


  

});






