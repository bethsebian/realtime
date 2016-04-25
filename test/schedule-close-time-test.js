const assert = require('assert');
const scheduleCloseTime = require('../lib/schedule-close-time.js');

describe('schedule-close-time', () => {
  it('should add close time to the poll', () => {
    var data = { year: 2016, month: 6, day: 18, hour: 2, minute: 45 };
    var pollObj = {};
    scheduleCloseTime(data, pollObj);

    assert.equal(pollObj.scheduledClose.constructor.name, "Date");
  });
});