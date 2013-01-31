// WARNING! Bindings are INTERNAL!
// They will CHANGE and your code will BREAK!
// Also, they don't throw when you do the wrong thing,
// they just ABORT, so DON'T DO WRONG THINGS!

var TCP = process.binding('tcp_wrap').TCP;

var serverHandle = new TCP();

// bind to a port
var PORT = 1337;
var r = serverHandle.bind('127.0.0.1', PORT);
