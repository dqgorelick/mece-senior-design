$(document).ready(function(){
    var client = io();
    $(".button").click(function(){
        console.log("Clicked!");
        client.emit("update");
    })
})
