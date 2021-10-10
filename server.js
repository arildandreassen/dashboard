const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const socketIo = require("socket.io");
const healthcheck = require("./routes/healthcheck");
const results = require("./routes/results");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 5000;
// const wss = new WebSocket.Server({ port: 8082 });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", healthcheck);
app.use("/", results);

server.listen(port, () => {
  console.log(`SERVER READY ON PORT ${port}`);
});

io.on("connection", (socket) => {
  console.log("connection");
  const time = new Date();

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
        console.log(`${time}: -updated results`);
        socket.emit("update", json);
      });
    }
  );
  req.on("error", (error) => {
    console.error(error);
  });
  req.end();

  setInterval(() => {
    const time = new Date();

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
          console.log(`${time}: -updated results`);
          io.emit("update", json);
        });
      }
    );
    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  }, 10000);
});
