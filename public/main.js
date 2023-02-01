const socket = io();

const numberOfClients = document.getElementById("total-client");

socket.on("total", (data) => {
  numberOfClients.innerText = `Total Clients: ${data}`;
});
