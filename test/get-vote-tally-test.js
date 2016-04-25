const assert = require('assert');
const getVoteTally = require('../lib/get-vote-tally.js');

describe('get-vote-tally', () => {
  it('should return a list of active options, 2 options', () => {
    var data = {name: "Name",
                a: "Hello",
                b: "You are sweet."
               }
    assert.equal(Object.keys(getVoteTally(data)).length, 2);
  });

  it('should return a list of active options, 3 options', () => {
    var data = {name: "Name",
                a: "Hello",
                b: "You are sweet.",
                c: "Hubba hubba."
               }
    assert.equal(Object.keys(getVoteTally(data)).length, 3);
  });
});