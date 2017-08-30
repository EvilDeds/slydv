/* global describe beforeEach it */
import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
import db from '../../server/db';

chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
const Slide = db.model('slide');

describe('Slide Model', () => {
  let slide;
  beforeEach('Synchronize and clear database', () => {
    return db.sync({ force: true })
      .then(() => Slide.create({
        title: 'What a slide',
        firstText: 'Wow. Much text. Such slide. Amaze.',
        secondText: 'MOAR TEXT',
        codeText: 'console.log("This is a test");',
        template: 'repl',
        positionInDeck: 1,
        presenterNotes: 'These are __presenter notes__',
      }))
      .then((newSlide) => { slide = newSlide; });
  });

  it('has a title', () => {
    expect(slide.title).to.equal('What a slide');
  });


  it('has text', () => {
    expect(slide.firstText).to.equal('Wow. Much text. Such slide. Amaze.');
    expect(slide.secondText).to.equal('MOAR TEXT');
    expect(slide.codeText).to.equal('console.log("This is a test");');
  });

  it('has a template which dafualts to single-pane', () => {
    expect(slide.template).to.equal('repl');
    Slide.create({ positionInDeck: 1 })
      .then(newSlide => expect(newSlide.template).to.equal('single-pane'));
  });

  it('requires a positionInDeck property', () => {
    const tempSlide = Slide.build();
    return tempSlide.validate()
      .catch((err) => {
        expect(err.errors).to.contain.a.thing.with.properties({
          path: 'positionInDeck',
          type: 'notNull Violation',
        });
      });
  });

  it('positionInDeck must be positive', () => {
    const tempSlide = Slide.build({ positionInDeck: -1 });
    return tempSlide.validate()
      .catch((err) => {
        expect(err.errors).to.contain.a.thing.with.properties({
          path: 'positionInDeck',
          type: 'Validation error',
        });
      });
  });

  it('empty titles default to Slide # + positionInDeck', () => {
    Slide.create({ positionInDeck: 2 })
      .then((emptyTitleSlide) => {
        expect(emptyTitleSlide.title).to.equal('Slide #2');
      });
  });
});

