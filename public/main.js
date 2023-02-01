const socket = io();

const numberOfClients = document.getElementById("total-client");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-message");
const nameInput = document.getElementById("user-name");
const messageInput = document.getElementById("message-input");
const messageBox = document.getElementById("message-box");

socket.on("total", (data) => {
  numberOfClients.innerText = `Total Clients: ${data}`;
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = messageInput.value;

  const data = {
    name: nameInput.value,
    message: message,
    dateTime: new Date(),
  };

  socket.emit("message", data);
  addMessageToFrontend(true, data);

  messageInput.value = "";
});

socket.on("chat-message", (data) => {
  console.log("data", data);
  addMessageToFrontend(false, data);
});

// Function to add message to Frontend
function addMessageToFrontend(isOwnMessage, data) {
  const element = `
    <li class="list-group-item w-25 border rounded-3 m-2 shadow-sm ${
      isOwnMessage
        ? "bg-primary text-white ms-auto"
        : "bg-secondary text-white me-auto"
    }">
        <div class="d-flex flex-column">
            <div class="text-start mb-2 bg-light p-2 rounded-3 text-dark">  
                ${data.message}
            </div>
            <div class="text-end">
                <span class="badge bg-light rounded-pill text-dark">${
                  data.name
                } ⏱️ ${moment(data.dateTime).fromNow()}</span>
            </div>
        </div>
    </li>`;

  messageContainer.innerHTML += element;

  autoScroll();
}

// Function to auto scroll
function autoScroll() {
  messageBox.scrollTo(0, messageBox.scrollHeight);
}
