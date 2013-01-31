var clients = {};
var clientId = 1;
require('net').createServer(function(socket) {
  socket.id = clientId++;
  clients[socket.id] = socket;
  socket.on('close', function() {
    delete clients[socket.id];
  });
  socket.on('data', function(chunk) {
    var say = socket.id + ': ' + chunk;
    Object.keys(clients).forEach(function(id) {
      if (+id === socket.id)
        return;
      clients[id].write(say);
    });
  });
}).listen(1337);
