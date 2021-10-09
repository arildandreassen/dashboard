const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const healthcheck = require("./routes/healthcheck");
const results = require("./routes/results");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", healthcheck);
app.use("/", results);

io.on("connection", (socket) => {
  setInterval(() => {
    const req = http.request(
      {
        hostname: "localhost",
        port: 5000,
        method: "GET",
        path: "/results",
      },
      (result) => {
        result.on("data", (data) => {
          const json = JSON.parse(data);
          io.emit("update", json);
        });
      }
    );
    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  }, 30000);
});

server.listen(port, () => {
  console.log(`SERVER READY ON PORT ${port}`);
});
