/* global describe it */
import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
import db from '../../server/db';

chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
const Chat = db.model('chat');

describe('Chat Model', () => {
  it('has text', () => {
    const chat = Chat.build({ message: 'Hello World!' });
    expect(chat.message).to.equal('Hello World!');
  });

  it('message cannot be null', () => {
    const newChat = Chat.build();
    return newChat.validate()
      .then(() => {
        throw new Error('This is not the error you are looking for.');
      })
      .catch((err) => {
        expect(err.errors).to.contain.a.thing.with.properties({
          path: 'message',
          type: 'notNull Violation',
        });
      });
  });
});
