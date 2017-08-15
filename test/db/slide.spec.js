/* global describe beforeEach it */
const { expect } = require('chai');
const db = require('../../server/db');


const Slide = db.model('slide');

describe('Slide Model', () => {
  let slide;
  beforeEach('Synchronize and clear database', () => {
    return db.sync({ force: true })
      .then(() => Slide.create({
        title: 'What a slide',
        text: 'Wow. Much text. Such slide. Amaze.',
        isRepl: false,
      }))
      .then((newSlide) => { slide = newSlide; });
  });

  it('has the expected schema definitions', () => {
    expect(Slide.attributes.title).to.be.an('object');
    expect(Slide.attributes.text).to.be.an('object');
    expect(Slide.attributes.isRepl).to.be.an('object');
    expect(Slide.attributes.codeText).to.be.an('object');
    expect(Slide.attributes.isHead).to.be.an('object');
    expect(Slide.attributes.nextId).to.be.an('object');
    expect(Slide.attributes.prevId).to.be.an('object');
  });

  it('has a title', () => {
    expect(slide.title).to.equal('What a slide');
  });
  it('has text', () => {
    expect(slide.text).to.equal('Wow. Much text. Such slide. Amaze.');
  });
  it('isHead defaults to false', () => {
    expect(slide.isHead).to.be.false;
  });
  it('prevId and nextId default to null', () => {
    expect(slide.prevId).to.equal(null);
    expect(slide.nextId).to.equal(null);
  });
});
