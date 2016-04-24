const assert = require('assert');
const app = require('../server');
const request = require('request');
const fixtures = require('./fixtures');

describe('Server', () => {
  before(done => {
    this.port = 9876;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {
    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a body with the name of the application', (done) => {
      var title = app.locals.title;

      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(title),
               `"${response.body}" does not include "${title}".`);
        done();
      });
    });
  });

  describe('GET /polls/new', () => {
    it('should not return 404', (done) => {
      this.request.get('/polls/new', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should have a form for submitting a new poll', (done) => {
      this.request.get('/polls/new', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes('Name:'),
               `"/polls/new does not include ${response.body}.`);
        assert(response.body.includes('Option 1:'),
              `"/polls/new does not include "Option 1:".`);
        assert(response.body.includes('Option 2:'),
               `"/polls/new does not include "Option 2:".`);
        assert(response.body.includes('Option 3:'),
              `"/polls/new does not include "Option 3:".`);
        done();
      });
    });
  });

  describe('POST /polls', () => {

    beforeEach(() => {
      app.locals.polls = {};
    });

    it('should receive and store data', (done) => {
      var payload = { polls: fixtures.validPoll };

      this.request.post('/polls', { form: payload }, (error, response) => {
        if (error) { done(error); }

        var pollCount = Object.keys(app.locals.polls).length;

        assert.equal(pollCount, 1, `Expected 1 poll, found ${pollCount}`);

        done();
      });
    });

    it('should not return 404', (done) => {
      this.request.post('/polls', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });
  });
  // describe('GET /voting/:id', () => {
  //   it('should return a 200', (done) => {
  //     request.get('/voting/:id', (error, response) => {
  //       if (error) { done(error); }
  //       assert.equal(response.statusCode, 200);
  //       done();
  //     });
  //   });
  // });
});