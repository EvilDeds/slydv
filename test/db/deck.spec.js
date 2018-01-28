/* global describe beforeEach it */
import { expect } from 'chai';
import db from '../../server/db';

const Deck = db.model('deck');

describe('Deck Model', () => {
  let deck;
  beforeEach('Synchronize and clear database', () => {
    return db.sync({ force: true })
      .then(() => Deck.create({
        deckTitle: 'Such deck',
        viewable: true,
        hasFooter: true,
        footerText: 'by Footer McFooterson',
      }))
      .then((newDeck) => { deck = newDeck; });
  });

  it('has a deckTitle', () => {
    expect(deck.deckTitle).to.equal('Such deck');
  });

  it('can be viewable', () => {
    expect(deck.viewable).to.be.true;
  });

  it('can have a footer and have that footer be viewable', () => {
    expect(deck.hasFooter).to.be.true;
    expect(deck.footerText).to.equal('by Footer McFooterson');
  });

  it('an empty deck defaults to the expected values', () => {
    Deck.create()
      .then((newDeck) => {
        expect(newDeck.deckTitle).to.equal('Untitled Deck');
        expect(newDeck.theme).to.equal('antique');
        expect(newDeck.hasFooter).to.be.false;
        expect(newDeck.footerText).to.equal('');
      });
  });
});
