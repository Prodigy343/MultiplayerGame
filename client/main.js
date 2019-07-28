var socket = io.connect("http://192.168.0.103:8080", {"forceNew":true});

socket.on("messages", function(data){
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function(item, index){
        return `
            <div class="msg">
                <strong>${item.author}</strong>
                <p>${item.text}</p>
            </div>
        `;
    })
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
    var payload = {
        author: document.getElementById("author").value,
        text: document.getElementById("text").value,
    }

    document.getElementById("author").style.display = "none";
    socket.emit("add-message", payload);
    return;
}