var express = require("express");
var app = express();
var port = 8080;
app.use(express.static(__dirname));
app.listen(port, function() {
    console.log("[ SERVER ] Hosting server on port " + port);
});