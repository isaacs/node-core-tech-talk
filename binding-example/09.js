...
// Connection handler!

serverHandle.onconnection = function onConnection(clientHandle) {
  if (!clientHandle) // a bad happened
    throw new Error('connect');

  // like socket.on('data', fn)
  clientHandle.onread = function(buffer, offset, length) {
    if (!buffer) {
      console.log(errno);
      clientHandle.close();
      clientHandle.onread = function() {};
    } else {
      console.log('data ' + buffer.slice(offset, offset + length));
    }
  };

  // like socket.resume()
  clientHandle.readStart();
};
