var getVoteTally = function (pollInfo) {
  var tally = {};
  Object.keys(pollInfo).forEach(function (key) {
    if(key !== "name" && pollInfo[key].length !== 0 ) {
      tally[key] = 0;
    }
  });
  return tally;
};

module.exports = getVoteTally;


