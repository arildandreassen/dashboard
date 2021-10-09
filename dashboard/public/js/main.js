const socket = io();

socket.on("update", (data) => {
  console.log(data);
});
