var net = require('net');

var sockets = [];

var s = net.Server((socket) => {
    socket.name = socket.remoteAddress + ':' + socket.remotePort;
    sockets.push(socket);

    socket.write('-----------------------------------\n');
    socket.write('----- WELCOME TO BERGELE CHAT -----\n');
    socket.write('-----------------------------------\n');

    socket.on('data', (d) => {
        for (var i=0;i<sockets.length;i++) {
            if (sockets[i] == socket) continue;
            sockets[i].write(d);
        }
    })
    
    socket.on('end', () => {
        var i = sockets.indexOf(socket);
        sockets.splice(i,1)
    })
});

s.listen(8080, () => {
    console.log('Chat has started!');
});
