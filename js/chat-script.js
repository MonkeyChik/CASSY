const chatLog = document.getElementById("chat-log");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("input", function() {
    if (messageInput.value.trim() !== "") {
        sendButton.disabled = false;
    } else {
        sendButton.disabled = true;
    }
});

function sendMessage() {
    const userMessage = messageInput.value.trim();

    if (userMessage === "") {
        //Display an error message or handle the case when a blank message is entered
        return;
    }

    messageInput.value = "";
    sendButton.disabled = true;

    //Display the user's message in the chat log
    displayMessage(userMessage, "user");

    //Make a request to the OpenAI model
    fetch('/api/api-chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.message;

        // Display the bot's response in the chat log
        displayMessage(botResponse, "bot");

        sendButton.disabled = "false";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}