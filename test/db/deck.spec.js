/* global describe beforeEach it */
const { expect } = require('chai');
const db = require('../../server/db');


const Deck = db.model('deck');

describe('Deck Model', () => {
  let deck;
  beforeEach('Synchronize and clear database', () => {
    return db.sync({ force: true })
      .then(() => Deck.create({
        deckTitle: 'Such deck',
        viewable: true,
        chats: 'chatty chat chat',
      }))
      .then((newDeck) => { deck = newDeck; });
  });

  it('has the expected schema definitions', () => {
    expect(Deck.attributes.deckTitle).to.be.an('object');
    expect(Deck.attributes.viewable).to.be.an('object');
    expect(Deck.attributes.chats).to.be.an('object');
    expect(Deck.attributes.userId).to.be.an('object');
  });
  it('has a deckTitle', () => {
    expect(deck.deckTitle).to.equal('Such deck');
  });
  it('is viewable', () => {
    expect(deck.viewable).to.be.true;
  });
  it('has chats', () => {
    expect(deck.chats).to.equal('chatty chat chat');
  });
});
