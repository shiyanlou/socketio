
var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');

var app = http.createServer(function(req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.write(data);
        res.end();
    });
}).listen(8080);

var io = socketio(app);

io.on('connection', function (socket) {
    socket.on('chat', function (data) {
        console.log(data);
        io.emit('sendmsg', data);
    });
});
