(function (root) {
    var output = document.getElementById("output");
    var socket = io.connect("localhost:8000/web");
    
    socket.on("connection", function () {
        console.log("socket connected");
    });
    
    socket.on("output", function (data) {
        var pre = document.createElement("pre");
        var line = data.line;
        var textNode = document.createTextNode(line);
        
        console.log(line);
        
        pre.appendChild(textNode);
        output.appendChild(pre);
    });
    
    socket.on("command", function (data) {
        var h2 = document.getElementById("command");
        var command = data.command;
        var textNode = document.createTextNode(command);
        
        h2.appendChild(textNode);
    });
})(this);