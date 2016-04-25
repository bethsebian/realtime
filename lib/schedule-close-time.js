var scheduleCloseTime = function (data, pollObj) {
  var closeStamp = new Date(data.year, (data.month - 1), data.day, data.hour, data.minute, 0, 0);
  pollObj.scheduledClose = closeStamp;
};

module.exports = scheduleCloseTime;
