const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.locals.title = 'Realtime';
app.locals.polls = {};

var server = http.createServer(app)
                 .listen(app.get('port'), function () {
                   console.log('Listening on port ' + app.get('port') + '.');
                 });

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/polls', (request, response) => {
  response.render('polls', { polls: app.locals.polls });
});

app.post('/polls', (request, response) => {
  var id = generateId();
  app.locals.polls[id] = request.body;
  app.locals.polls[id].votes = { a: 0, b: 0, c: 0, d: 0 };
  response.redirect(`polls/${id}`);
});

app.get('/polls/new', (request, response) => {
  response.render('new-poll');
});

app.get('/polls/:id', (request, response) => {
  var pollId = request.params.id;
  var poll = app.locals.polls[pollId];

  response.render('poll', { pollId: pollId, poll: poll });
});

app.get('/voting/:id', (request, response) => {
  var pollId = request.params.id;
  var poll = app.locals.polls[pollId];
  console.log(app.locals.polls[pollId]);
  response.render('voting', { pollId: pollId, poll: poll });
});

// app.listen(app.get('port'), () => {
//   console.log(`${app.locals.title} is running on ${app.get('port')}.`);
// });


//
//
//
//
//
//
const socketIo = require('socket.io');
const io = socketIo(server);
//
// var votes = {};
//
io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);
//   io.sockets.emit('usersConnected', io.engine.clientsCount);
//   socket.emit('statusMessage', 'You have connected.')
//
  socket.on('message', function (channel, message) {
    if (channel === 'voteSubmitted') {
      var voteOption = message.vote;
      var poll = message.pollId;
      incrementVotes(poll, voteOption);
      io.sockets.emit('voteTally', {votes: app.locals.polls[poll].votes, vote: voteOption})
      // io.sockets.emit('voteCount', countVotes(votes));
    }
  });
//
//   socket.on('disconnect', function () {
//     console.log('A user has disconnected.', io.engine.clientsCount);
//     delete votes[socket.id];
//     socket.emit('voteCount', countVotes(votes));
//     io.sockets.emit('usersConnected', io.engine.clientsCount);
//   });
});

var incrementVotes = function (poll, voteOption) {
  app.locals.polls[poll].votes[voteOption]++;
  console.log(app.locals.polls[poll].votes);
};

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