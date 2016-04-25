const currentTime = require('../lib/current-time.js');

var updateStatus = function (poll) {
  if (poll.scheduledClose && poll.scheduledClose < currentTime()) {
    poll.active = false;
  }
};

module.exports = updateStatus;
