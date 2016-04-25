const currentTime = require('../lib/current-time.js');

var incrementVotes = function (app, pollId, voteOption) {
  var poll = app.locals.polls[pollId];
  if (!poll.scheduledClose || poll.scheduledClose && poll.scheduledClose > currentTime()) {
    poll.votes[voteOption]++;
  }
};

module.exports = incrementVotes;
