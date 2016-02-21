$(document).ready(function(){
    // CHANGE THIS DEPENDING ON DEV vs EDISON IP
    var wsUrl = 'ws://155.41.104.207:8084/';
    // var wsUrl = 'ws://localhost:8084/';
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
        },
        off_up : {
            command : "OFF_UP"
        },
        off_down : {
            command : "OFF_DOWN"
        },
        off_left : {
            command : "OFF_LEFT"
        },
        off_right : {
            command : "OFF_RIGHT"
        }
    }

    var keysDown = {};

    addEventListener("keydown", function(e) {
        console.log(e.keyCode);
        if (e.keyCode === 38) { // Player holding up
            e.preventDefault();
            if(!keysDown[e.keyCode]) {
                client.send(JSON.stringify(commands.up));
            }
            keysDown[e.keyCode] = true;
        }
        if (e.keyCode === 40) { // Player holding down
            e.preventDefault();
            if(!keysDown[e.keyCode]) {
                client.send(JSON.stringify(commands.down));
            }
            keysDown[e.keyCode] = true;
        }
        if (e.keyCode === 37) { // Player holding left
            e.preventDefault();
            if(!keysDown[e.keyCode]) {
                client.send(JSON.stringify(commands.left));
            }
            keysDown[e.keyCode] = true;
        }
        if (e.keyCode === 39) { // Player holding right
            e.preventDefault();
            if(!keysDown[e.keyCode]) {
                client.send(JSON.stringify(commands.right));
            }
            keysDown[e.keyCode] = true;
        }
    }, false);

    addEventListener("keyup", function(e) {
        if (e.keyCode === 38) { // Player holding up
            keysDown[e.keyCode] = false;
            client.send(JSON.stringify(commands.off_up));
        }
        if (e.keyCode === 40) { // Player holding down
            keysDown[e.keyCode] = false;
            client.send(JSON.stringify(commands.off_down));
        }
        if (e.keyCode === 37) { // Player holding left
            keysDown[e.keyCode] = false;
            client.send(JSON.stringify(commands.off_left));
        }
        if (e.keyCode === 39) { // Player holding right
            keysDown[e.keyCode] = false;
            client.send(JSON.stringify(commands.off_right));
        }
    }, false);
    /*
    function cycle(elapsed) {
        if (keysDown[38] == true) { // Player holding up
            client.send(JSON.stringify(commands.up));
        }
        if (keysDown[40] == true) { // Player holding down
            client.send(JSON.stringify(commands.down));
        }
        if (keysDown[37] == true) { // Player holding left
            client.send(JSON.stringify(commands.left));
        }
        if (keysDown[39] == true) { // Player holding right
            client.send(JSON.stringify(commands.right));
        }
    }
    */
    // initiate 60 fps cycle
    // loopManager.run(cycle)
})
