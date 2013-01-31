...
if (r) {
  serverHandle.close();
  throw new Error('listen');
}

// WHAT'S MISSING?
// Connection handler!

serverHandle.onconnection = function onConnection(clientHandle) {
  // ...
};
