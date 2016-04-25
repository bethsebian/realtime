var incrementVotes = function (app, poll, voteOption) {
  if (!poll.scheduledClose || poll.scheduledClose && poll.scheduledClose > currentTime()) {
    app.locals.polls[poll].votes[voteOption]++;
  }
};

module.exports = incrementVotes;
