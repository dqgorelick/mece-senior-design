var express = require("express");
var app = express();
var path = require("path");
var port = process.argv[2] || 8080;
// var http = require('http').Server(app);
var io = require('socket.io')(http);
var exec = require('child_process').exec;
var cmd = "node -v";

var http = require('http');
var childProcess = require('child_process');
var morgan = require('morgan');
var ws = require('ws');

app.use(express.static(__dirname));


// io.on('connection', function(socket) {
//     console.log("Edison connected!");
//     socket.on("update", function(){
//         console.log("Working!");
//         exec(cmd, function(error, stdout, stderr) {
//             console.log('stdout: ' + stdout);
//             console.log('stderr: ' + stderr);
//             if (error !== null) {
//                 console.log('exec error: ' + error);
//             }
//         });
//     })
// })
// http.listen(port, function() {
//     console.log("[ SERVER ] Hosting server on port " + port);
// });

// configuration files
var configServer = require('./lib/config/server');

// app parameters
app.set('port', configServer.httpPort);
app.use(express.static(configServer.staticFolder));
app.use(morgan('dev'));

// serve index
require('./lib/routes').serveIndex(app, configServer.staticFolder);

// HTTP server
http.createServer(app).listen(app.get('port'), function() {
    console.log('HTTP server listening on port ' + app.get('port'));
});

/// Video streaming section
// Reference: https://github.com/phoboslab/jsmpeg/blob/master/stream-server.js

var STREAM_MAGIC_BYTES = 'jsmp'; // Must be 4 bytes
var width = 320;
var height = 240;

// WebSocket server
var wsServer = new(ws.Server)({
    port: configServer.wsPort
});
console.log('WebSocket server listening on port ' + configServer.wsPort);

wsServer.on('connection', function(socket) {
    // Send magic bytes and video size to the newly connected socket
    // struct { char magic[4]; unsigned short width, height;}
    var streamHeader = new Buffer(8);

    streamHeader.write(STREAM_MAGIC_BYTES);
    streamHeader.writeUInt16BE(width, 4);
    streamHeader.writeUInt16BE(height, 6);
    socket.send(streamHeader, {
        binary: true
    });

    console.log('New WebSocket Connection (' + wsServer.clients.length + ' total)');

    socket.on('close', function(code, message) {
        console.log('Disconnected WebSocket (' + wsServer.clients.length + ' total)');
    });
});

wsServer.broadcast = function(data, opts) {
    for (var i in this.clients) {
        if (this.clients[i].readyState == 1) {
            this.clients[i].send(data, opts);
        } else {
            console.log('Error: Client (' + i + ') not connected.');
        }
    }
};

// HTTP server to accept incoming MPEG1 stream
http.createServer(function(req, res) {
    console.log(
        'Stream Connected: ' + req.socket.remoteAddress +
        ':' + req.socket.remotePort + ' size: ' + width + 'x' + height
    );
    req.on('data', function(data) {
        wsServer.broadcast(data, {
            binary: true
        });
    });
}).listen(configServer.streamPort, function() {
    console.log('Listening for video stream on port ' + configServer.streamPort);

    // Run do_ffmpeg.sh from node
    childProcess.exec('/bin/do_ffmpeg.sh');
});

module.exports.app = app;