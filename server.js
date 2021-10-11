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

let allResults;

server.listen(port, () => {
  console.log(`SERVER READY ON PORT ${port}`);
});

server.on("listening", function () {
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
        allResults = json;
      });
    }
  );
  req.on("error", (error) => {
    console.error(error);
  });
  req.end();

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
          console.log(
            `${new Date().toLocaleString()} updating current results from database`
          );
          allResults = json;
        });
      }
    );
    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  }, 10000);
});

io.on("connection", (socket) => {
  console.log(`${new Date().toLocaleString()} client connected`);
  socket.emit("update", allResults);

  setInterval(() => {
    console.log(`${new Date().toLocaleString()} sending current results`);
    socket.emit("update", allResults);
  }, 10000);

  socket.on("disconnect", () => {
    console.log(`${new Date().toLocaleString()} client disconnected`);
  });
});
