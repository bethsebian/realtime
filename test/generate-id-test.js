const assert = require('assert');
const generateId = require('../lib/generate-id.js');

describe('generate-id', () => {
  it('should return a string', () => {
    assert.equal(generateId().constructor.name, "String");
  });

  it('should have 20 characters', () => {
    assert.equal(generateId().length, 20);
  })
});