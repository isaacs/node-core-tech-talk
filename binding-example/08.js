...
// Connection handler!

serverHandle.onconnection = function onConnection(clientHandle) {
  if (!clientHandle) // a bad happened
    throw new Error('connect');

  // like socket.on('data', fn)
  clientHandle.onread = function(buffer, offset, length) {};
};
