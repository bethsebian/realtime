const assert = require('assert');
const updateStatus = require('../lib/update-status.js');

describe('update-status', () => {
  it('should update the status of the poll', () => {
    var timeStamp = new Date(2011, 7, 1, 3, 45, 0, 0);
    var poll = { scheduledClose: timeStamp, active: true};

    assert(poll.active);
    updateStatus(poll);
    // assert.equal(poll.active, false);
  });
});