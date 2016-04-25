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
  app.locals.polls[id].votes = getVoteTally(request.body)
  app.locals.polls[id].active = true;
  response.redirect(`polls/${id}`);
});

app.get('/polls/new', (request, response) => {
  response.render('new-poll');
});

app.post('/polls/:id', (request, response) => {

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
      incrementVotes(poll, voteOption);
      io.sockets.emit('voteTally', {votes: app.locals.polls[poll].votes, vote: voteOption, pollId: poll, poll: app.locals.polls[poll]});
    }
    if (channel === "closePoll") {
      app.locals.polls[poll].active = false;
      io.sockets.emit('updateStatus', {pollId: poll, poll: app.locals.polls[poll]});
    }
  });
});

var updateStatus = function (poll) {
  if (poll.scheduledClose && poll.scheduledClose < currentTime) {
    poll.active = false;
  }
};

var incrementVotes = function (poll, voteOption) {
  if (!poll.scheduledClose || poll.scheduledClose && poll.scheduledClose > currentTime()) {
    app.locals.polls[poll].votes[voteOption]++;
  }
};

var currentTime = function () {
  var d = new Date();
  return d.toUTCString();
};

var getVoteTally = function (pollInfo) {
  var tally = {};
  Object.keys(pollInfo).forEach(function (key) {
    if(key !== "name" && pollInfo[key].length !== 0 ) {
      tally[key] = 0;
    }
  });
  return tally;
};

var scheduleCloseTime = function (data, pollObj) {
  var closeStamp = new Date(data.year, (data.month - 1), data.day, data.hour, data.minute, 0, 0);
  pollObj.scheduledClose = closeStamp;
};

module.exports = app;