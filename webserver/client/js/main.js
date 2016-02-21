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
    var code = "0000";
    function replaceBit(string, index, value) {
        return string.substr(0,index-1) + value + string.substr(index,string.length);
    }

    addEventListener("keydown", function(e) {
        console.log(e.keyCode);
        if (e.keyCode === 38) { // Player holding up
            e.preventDefault();
            if(!keysDown[e.keyCode]) {
                code = "0000";
                code = replaceBit(code, 1, "1");
            }
            keysDown[e.keyCode] = true;
        }
        if (e.keyCode === 37) { // Player holding left
            e.preventDefault();
            if(!keysDown[e.keyCode]) {
                code = "0000";
                code = replaceBit(code, 2, "1");
            }
            keysDown[e.keyCode] = true;
        }
        if (e.keyCode === 40) { // Player holding down
            e.preventDefault();
            if(!keysDown[e.keyCode]) {
                code = "0000";
                code = replaceBit(code, 3, "1");
            }
            keysDown[e.keyCode] = true;
        }
        if (e.keyCode === 39) { // Player holding right
            e.preventDefault();
            if(!keysDown[e.keyCode]) {
                code = "0000";
                code = replaceBit(code, 4, "1");
            }
            keysDown[e.keyCode] = true;
        }
        client.send(code);
    }, false);

    addEventListener("keyup", function(e) {
        if (e.keyCode === 38) { // Player holding up
            keysDown[e.keyCode] = false;
            code = replaceBit(code, 1, "0");
        }
        if (e.keyCode === 37) { // Player holding left
            keysDown[e.keyCode] = false;
            code = replaceBit(code, 2, "0");
        }
        if (e.keyCode === 40) { // Player holding down
            keysDown[e.keyCode] = false;
            code = replaceBit(code, 3, "0");
        }
        if (e.keyCode === 39) { // Player holding right
            keysDown[e.keyCode] = false;
            code = replaceBit(code, 4, "0");
        }
        // client.send(code);
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
