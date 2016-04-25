var currentTime = function () {
  var d = new Date();
  return d.toUTCString();
};

module.exports = currentTime;
