var express = require("express");
var app = express();
var path = require("path");
var port = process.argv[2] || 8080;
var http = require('http').Server(app);
var io = require('socket.io')(http);
var exec = require('child_process').exec;
var cmd = "node -v";
app.use(express.static(__dirname));


io.on('connection', function(socket) {
    console.log("Edison connected!");
    socket.on("update", function(){
        console.log("Working!");
        exec(cmd, function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    })
})


http.listen(port, function() {
    console.log("[ SERVER ] Hosting server on port " + port);
});
