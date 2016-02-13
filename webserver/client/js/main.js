$(document).ready(function(){

    // var wsUrl = 'ws://155.41.64.114:8084/';
    var wsUrl = 'ws://localhost:8084/';
    // Show loading notice
    var canvas = document.getElementById('canvas-video');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#333';
    ctx.fillText('Loading...', canvas.width/2-30, canvas.height/3);

    // Start the player
    var client = new WebSocket(wsUrl);
    var player = new jsmpeg(client, { canvas:canvas });

    var commands = {
        up : {
            command : "UP",
            data : "Hello World"
        },
        left : {
            command : "LEFT",
            data : "Lorem ipsum dolor sit amet"
        },
        right : {
            command : "RIGHT",
            data : "Lorem ipsum dolor sit amet"
        },
        down : {
            command : "DOWN",
            data : "Lorem ipsum dolor sit amet"
        }
    }

    var keysDown = {};

    addEventListener("keydown", function(e) {
        console.log(e.keyCode);
        if (e.keyCode === 38) { // Player holding up
            e.preventDefault();
            keysDown[e.keyCode] = true;
        }
        if (e.keyCode === 40) { // Player holding down
            e.preventDefault();
            keysDown[e.keyCode] = true;
        }
        if (e.keyCode === 37) { // Player holding left
            e.preventDefault();
            keysDown[e.keyCode] = true;
        }
        if (e.keyCode === 39) { // Player holding right
            e.preventDefault();
            keysDown[e.keyCode] = true;
        }
    }, false);

    addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode];
    }, false);

    function cycle(elapsed) {
        if (38 in keysDown) { // Player holding up
            client.send(JSON.stringify(commands.up));
        }
        if (40 in keysDown) { // Player holding down
            client.send(JSON.stringify(commands.down));
        }
        if (37 in keysDown) { // Player holding left
            client.send(JSON.stringify(commands.left));
        }
        if (39 in keysDown) { // Player holding right
            client.send(JSON.stringify(commands.right));
        }
    }
    // initiate 60 fps cycle
    loopManager.run(cycle)
})
