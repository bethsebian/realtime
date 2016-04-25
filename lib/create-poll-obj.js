const getVoteTally = require('../lib/get-vote-tally.js');

var createPollObj = function (app, id, request) {
  app.locals.polls[id] = request.body;
  app.locals.polls[id].votes = getVoteTally(request.body);
  app.locals.polls[id].active = true;
};

module.exports = createPollObj;
