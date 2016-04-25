const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');
const currentTime = require('./lib/current-time');
const getVoteTally = require('./lib/get-vote-tally');
const incrementVotes = require('./lib/increment-votes');
const scheduleCloseTime = require('./lib/schedule-close-time');
const updateStatus = require('./lib/update-status');

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
  app.locals.polls[id].votes = getVoteTally(request.body)
  app.locals.polls[id].active = true;
  response.redirect(`polls/${id}`);
});

app.get('/polls/new', (request, response) => {
  response.render('new-poll');
});

app.get('/polls/:id', (request, response) => {
  var pollId = request.params.id;
  var poll = app.locals.polls[pollId];
  updateStatus(poll);

  if (Object.keys(request.query).length > 0) {
    scheduleCloseTime(request.query, poll);
  }

  response.render('poll', { pollId: pollId, poll: poll });
});


app.get('/voting/:id', (request, response) => {
  var pollId = request.params.id;
  var poll = app.locals.polls[pollId];
  updateStatus(poll);

  response.render('voting', { pollId: pollId, poll: poll, voting: true });
});


const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  socket.on('message', function (channel, message) {
    var voteOption = message.vote;
    var poll = message.pollId;
    if (channel === 'voteSubmitted') {
      incrementVotes(app, poll, voteOption);
      io.sockets.emit('voteTally', {votes: app.locals.polls[poll].votes, vote: voteOption, pollId: poll, poll: app.locals.polls[poll]});
    }
    if (channel === "closePoll") {
      app.locals.polls[poll].active = false;
      io.sockets.emit('updateStatus', {pollId: poll, poll: app.locals.polls[poll]});
    }
  });
});

module.exports = app;