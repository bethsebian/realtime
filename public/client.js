var socket = io();

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