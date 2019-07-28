//basic config for socket.io
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var messages = [
    {
        id: 1,
        text: "Hello user, connection successful",
        author: "Prodigy Bot"
    }
];

app.use(express.static("client"));

//realtime-chat like view
app.get("/", function(req, res){
    res.sendFile('index.html');
});

//handling views
app.get("/send", function(req, res){
    res.sendFile('index.html');
});
app.get("/read", function(req, res){
    res.sendFile('index.html');
});

//Socket IO handling
io.on("connection", function(socket){
    console.log("IP Node: " + socket.handshake.address);
    socket.emit("messages", messages);

    socket.on("add-message", function(data){
        messages.push(data);

        io.sockets.emit("messages", messages);
    });

});

server.listen(8080, function(){

    console.log("everything is ok!");
});
