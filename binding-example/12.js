var clientId = 1;
var clients = {};

serverHandle.onconnection = function onConnection(clientHandle) {
  if (!clientHandle) // a bad happened
    throw new Error('connect');

  // add to the list
  clients[clientId++] = clientHandle;

  // like socket.on('data', fn)
  clientHandle.onread = function(buffer, offset, length) {
    // ..
  };

  // ...
};
