const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.locals.title = 'Realtime';
app.locals.surveys = {};

app.get('/', (request, response) => {
  response.render('index');
  // response.send('Welcome to ' + app.locals.title + '!');
});

app.post('/polls', (request, response) => {
  response.sendStatus(201);
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}


// app.use(express.static('public'));
//
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });
//
var port = process.env.PORT || 3000;
// var server = http.createServer(app)
//
// server.listen(port, function () {
//   console.log('Listening on port ' + port + '.');
// });
//
//
//
//
//
//
// const socketIo = require('socket.io');
// const io = socketIo(server);
//
// var votes = {};
//
// io.on('connection', function (socket) {
//   console.log('A user has connected.', io.engine.clientsCount);
//   io.sockets.emit('usersConnected', io.engine.clientsCount);
//   socket.emit('statusMessage', 'You have connected.')
//
//   socket.on('message', function (channel, message) {
//     if (channel === 'voteCast') {
//       votes[socket.id] = message;
//       io.sockets.emit('voteCount', countVotes(votes));
//     }
//   });
//
//   socket.on('disconnect', function () {
//     console.log('A user has disconnected.', io.engine.clientsCount);
//     delete votes[socket.id];
//     socket.emit('voteCount', countVotes(votes));
//     io.sockets.emit('usersConnected', io.engine.clientsCount);
//   });
// });
//
// function countVotes(votes) {
//   var voteCount = {
//       A: 0,
//       B: 0,
//       C: 0,
//       D: 0
//   };
//   for (var vote in votes) {
//     voteCount[votes[vote]]++;
//   }
//   return voteCount;
// }
//
module.exports = app;