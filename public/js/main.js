(function (root) {
    var output = document.getElementById("output");
    var socket = io.connect("localhost:8000/web");
    
    socket.on("error", function (data) {
        var pre = createPreElementWithText(data.line);
        
        pre.classList.add("error");
        
        output.appendChild(pre);
    });
    
    socket.on("output", function (data) {
        var pre = createPreElementWithText(data.line);
        
        output.appendChild(pre);
    });
    
    var commandElement = document.getElementById("command");
    socket.on("command", function (data) {
        var command = data.command;
        var textNode = document.createTextNode(command);
        
        commandElement.appendChild(textNode);
    });
    
    var createPreElementWithText = function (text) {
        var pre = document.createElement("pre");
        var textNode = document.createTextNode(text);
        pre.appendChild(textNode);
        
        return pre;
    };
})(this);