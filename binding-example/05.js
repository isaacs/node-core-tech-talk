...
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
