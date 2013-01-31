var clientId = 1;
var clients = {};

serverHandle.onconnection = function onConnection(clientHandle) {
  if (!clientHandle) // a bad happened
    throw new Error('connect');

  // add to the list
  clientHandle.id = clientId;
  clients[clientId++] = clientHandle;

  // like socket.on('data', fn)
  clientHandle.onread = function(buffer, offset, length) {
    if (!buffer) {
      // ...
      delete clients[clientHandle.id];
    } else {
      var say = clientHandle.id + ': ' + buffer.slice(offset, offset+length);
      Object.keys(clients).forEach(function(id) {
        // ...

        writeReq.afterWrite = function(status, handle, req) {
          if (status)
            return console.error('write error', errno);
        };
      });
    }
  };

  // ...
};
