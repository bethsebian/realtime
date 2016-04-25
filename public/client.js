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

scheduleClose.addEventListener('click', function () {
  var closeWrap = document.getElementById('close-wrap');
  var scheduleForm = document.getElementById('schedule-form');
  if (scheduleForm) { closeWrap.remove(scheduleForm); }

})

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




// button.addEventListener('click', function () {
//   console.log("hello, button 1 was clicked");
// });
//
// button.addEventListener('click', function () {
//   console.log("hello, button 1 was clicked");
// });
//
// button.addEventListener('click', function () {
//   console.log("hello, button 1 was clicked");
// });
// var connectionCount = document.getElementById('connection-count');
//
// socket.on('usersConnected', function (count) {
//   connectionCount.innerText = 'Connected Users: ' + count;
// });
//
// var statusMessage = document.getElementById('status-message');
//
// socket.on('statusMessage', function (message) {
//   statusMessage.innerText = message;
// });
//
// var buttons = document.querySelectorAll('#choices button');
//
// for (var i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener('click', function () {
//     socket.send('voteCast', this.innerText);
//   });
// }
//
// var results = document.getElementById('results');
//
// socket.on('voteCount', function (votes) {
//   // results.empty();
//   for (var voteOption in votes) {
//     results.innerText = voteOption + ': ' + votes[voteOption];
//   }
// });