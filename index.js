var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  //Set Default username
  socket.username = "Anonymous";

  //Listen to change_username evemt
  socket.on('change_username', function(data) {
    socket.username = data.username;
  })

  //Listen for new messages from client
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', {msg: msg, username: socket.username});
  });

  //Listen for disconnect event
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(8000, function(){
  console.log('listening on *:8000');
});