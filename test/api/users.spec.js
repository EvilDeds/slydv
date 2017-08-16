/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server/index');

const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => db.sync({ force: true }));

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => User.create({ email: codysEmail }));

    it('GET /api/users', () =>
      request(app)
        .get('/api/users')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(codysEmail);
        }));

    it ('GET api/users/:userId/decks', () =>
      request(app)
        get('api/users/:userId/decks')
        expect(200)
        .then(())
      )
  });

});
