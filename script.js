const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});

async function sendMessage(){

    const message = input.value.trim();

    if(!message) return;

    addMessage(message, "user");

    input.value = "";

    const typing = addTyping();

    try{

        const response = await fetch("http://localhost:3000/chat",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:message
            })
        });

        const data = await response.json();

        typing.remove();

        addMessage(data.reply, "ai");

    }catch(error){

        typing.remove();

        addMessage("Connection failed.", "ai");
    }
}

function addMessage(text, sender){

    const div = document.createElement("div");

    div.className = sender;

    div.innerHTML = `
        <div class="bubble">${text}</div>
    `;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function addTyping(){

    const div = document.createElement("div");

    div.className = "ai";

    div.innerHTML = `
        <div class="bubble typing">
            Prime is thinking...
        </div>
    `;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

    return div;
}
