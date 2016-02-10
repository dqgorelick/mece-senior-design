$(document).ready(function(){
    // var client = io();
    // $(".button").click(function(){
    //     console.log("Clicked!");
    //     client.emit("update");
    // })
    var wsUrl = 'ws://155.41.64.114:8084/';

    // Show loading notice
    var canvas = document.getElementById('canvas-video');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#333';
    ctx.fillText('Loading...', canvas.width/2-30, canvas.height/3);

    // Start the player
    var client = new WebSocket(wsUrl);
    var player = new jsmpeg(client, { canvas:canvas });
})