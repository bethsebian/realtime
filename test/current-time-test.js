const assert = require('assert');
const currentTime = require('../lib/current-time.js');

describe('current-time', () => {
  it('should return a time', () => {
    assert.equal(currentTime().constructor.name, "String");
  });
});