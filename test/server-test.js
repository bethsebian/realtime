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

  describe('GET /polls/:id', () => {
    it('should not return a 404', (done) => {
      app.locals.polls = { "uniqueid": fixtures.validPoll };
      app.locals.polls["uniqueid"].votes = { a: 0, b:0, c:0, d:0 };

      this.request.get('/polls/uniqueid', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should show unique poll content', (done) => {
      app.locals.polls = { "uniqueid": fixtures.validPoll };
      app.locals.polls["uniqueid"].votes = { a: 0, b:0, c:0, d:0 };

      this.request.get('/polls/uniqueid', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(app.locals.polls['uniqueid'].name),
               `"/poll/:id" does not include "${app.locals.polls['uniqueid'].name}".`);
        done();
      });
    });
  });

  describe('GET /voting/:id', () => {
    it('should not return a 404', (done) => {
      app.locals.polls = { "uniqueid": fixtures.validPoll };

      this.request.get('/voting/uniqueid', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should show unique poll content', (done) => {
      app.locals.polls = { "uniqueid": fixtures.validPoll };

      this.request.get('/voting/uniqueid', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(app.locals.polls['uniqueid'].name),
               `"/poll/:id" does not include "${app.locals.polls['uniqueid'].name}".`);
        done();
      });
    });
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


  describe('GET /polls', () => {
    it('should not return 404', (done) => {
      this.request.get('/polls', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should show current polls', (done) => {
      app.locals.polls = { polls: fixtures.validPoll };

      this.request.get('/polls', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(fixtures.validPoll.name),
              `"/polls/new does not include ${fixtures.validPoll.name}.`);
        assert(response.body.includes(fixtures.validPoll.a),
              `"/polls/new does not include ${fixtures.validPoll.a}.`);
        assert(response.body.includes(fixtures.validPoll.b),
              `"/polls/new does not include ${fixtures.validPoll.b}.`);
        assert(response.body.includes(fixtures.validPoll.c),
              `"/polls/new does not include ${fixtures.validPoll.c}.`);
        done();
      });
    });
  });

  describe('POST /polls', () => {
    beforeEach(() => {
      app.locals.polls = {};
    });

    it('should redirect to /polls/:id', (done) => {
      done();
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
});