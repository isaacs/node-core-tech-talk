// require('net').createServer(function(sock) {
//   sock.on('data', function(buf) {
//     console.log('data ' + buf);
//   });
// }).listen(1337)

var TCP = process.binding('tcp_wrap').TCP;

var serverHandle = new TCP();

// bind to a port
var PORT = 1337;
var r = serverHandle.bind('127.0.0.1', PORT);

if (r) {
  serverHandle.close();
  throw new Error('bind');
}

// this argument is not like server.listen(511) in JS
// 511 is the backlog length. The kernel adds 1 and
// rounds up to the nearest power of 2 = 512
var r = serverHandle.listen(511);
if (r) {
  serverHandle.close();
  throw new Error('listen');
}
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
      console.error(errno);
      clientHandle.close();
      clientHandle.onread = function() {};
      delete clients[clientHandle.id];
    } else {
      var say = clientHandle.id + ': ' + buffer.slice(offset, offset+length);
      Object.keys(clients).forEach(function(id) {
        if (+id === clientHandle.id)
          return;

        var to = clients[id];
        var writeReq = to.writeUtf8String(say);
        if (!writeReq)
          return console.error('write', errno);

        writeReq.oncomplete = function(status, handle, req) {
          if (status)
            return console.error('write error', errno);
        };
      });
    }
  };

  clientHandle.readStart();
};
