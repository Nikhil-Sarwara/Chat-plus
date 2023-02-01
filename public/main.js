const socket = io();

socket.on("total", (data) => {
  console.log(data);
});
