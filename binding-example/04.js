...

// bind to a port
var PORT = 1337;
var r = serverHandle.bind('127.0.0.1', PORT);

if (r) {
  serverHandle.close();
  throw new Error('bind');
}
