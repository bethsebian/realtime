var socket = io();
var buttons = document.getElementsByClassName('options-button');

for (var i = 0; i < buttons.length; i++ ) {
  buttons[i].addEventListener('click', function () {
    var id = window.location.pathname.split('/')[2]
    socket.send('voteSubmitted', { vote: this.id, pollId: id });
  });
}

var voteTallyDiv = document.getElementById('vote-tally')

socket.on('voteTally', function (message) {
  var votes = message.votes;
  var newTally = "";
  console.log(newTally);

  Object.keys(votes).forEach(function (key) {
    newTally = newTally + (key + ": " + votes[key] + "\n")
    console.log(newTally);
  });
  console.log(newTally);

  voteTallyDiv.innerText = newTally;

  // for (var i = 0; i < Object.keys(votes).length; i++ ) {
  //   // console.log("hello world!")
  //   voteTallyDiv.innerText = votes
  //
  // // voteTallyDiv.innerText = message.votes
  // // each val, index in poll.votes
  // //   li= index + ": " + val
  // }
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