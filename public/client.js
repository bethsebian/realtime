var socket = io();
var voteButtons = document.getElementsByClassName('options-button');
var closePollButtons = document.getElementsByClassName('close-poll');

for (var i = 0; i < voteButtons.length; i++ ) {
  voteButtons[i].addEventListener('click', function () {
    var id = window.location.pathname.split('/')[2]
    socket.send('voteSubmitted', { vote: this.id, pollId: id });
  });
}

var scheduleClose = document.getElementById('schedule-close-submit')

if (scheduleClose) {
  scheduleClose.addEventListener('click', function () {
    var closeWrap = document.getElementById('close-wrap');
    var scheduleForm = document.getElementById('schedule-form');
    if (scheduleForm) { closeWrap.remove(scheduleForm); }
  });
}

for (var i = 0; i < closePollButtons.length; i++ ) {
  closePollButtons[i].addEventListener('click', function () {
    var id = window.location.pathname.split('/')[2]
    socket.send('closePoll', { pollId: id });
  });
}

socket.on('voteTally', function (message) {
  var voteTallyDiv = document.getElementById('vote-tally-' + message.pollId )
  var votes = message.votes;
  var newTally = "";
  Object.keys(votes).forEach(function (key) {
    newTally = newTally + message.poll[key] + ": " + votes[key] + '\n';
  });
  voteTallyDiv.innerText = newTally;
});

socket.on('updateStatus', function(message) {
  var pollStatusDiv = document.getElementById('poll-status');
  pollStatusDiv.innerHTML = "Poll has closed" + "<br>";

  var votingButtons = document.getElementById('voting-buttons');
  var removeButtons = document.getElementById('close-buttons');
  if (removeButtons) { votingButtons.remove(removeButtons); }
});