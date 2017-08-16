/* global describe beforeEach after it */
const { expect } = require('chai');
const db = require('../../server/db');

const User = db.model('user');

describe('User model', () => {
  after(() => {
    db.sync({ force: true });
  });
  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach(() =>
        db.sync({ force: true })
          .then(() =>
            User.create({
              email: 'cody1@puppybook.com',
              password: 'bones',
            }),
          )
          .then((user) => {
            cody = user;
          }),
      );

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });
    });
  });
});
