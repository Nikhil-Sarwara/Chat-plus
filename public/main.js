const socket = io();

const numberOfClients = document.getElementById("total-client");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-message");
const nameInput = document.getElementById("user-name");
const messageInput = document.getElementById("message-input");

socket.on("total", (data) => {
  numberOfClients.innerText = `Total Clients: ${data}`;
});

messageForm.addEventListener("submit", (event) => {
  const message = messageInput.value;

  const data = {
    name: nameInput.value,
    message: message,
    dateTime: new Date(),
  };

  socket.emit("message", data);
});

socket.on("chat-message", (data) => {});
