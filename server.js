const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const healthcheck = require("./routes/healthcheck");
const results = require("./routes/results");

const app = express();
const port = process.env.PORT || 5000;
const wss = new WebSocket.Server({ port: 8082 });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", healthcheck);
app.use("/", results);

app.listen(port, () => {
  console.log(`SERVER READY ON PORT ${port}`);
});

wss.on("connection", (ws) => {
  console.log("new connection");

  setInterval(() => {
    const req = http.request(
      {
        method: "GET",
        hostname: "localhost",
        port: 5000,
        path: "/results",
      },
      (result) => {
        result.on("data", (data) => {
          console.log("sending update");
          const json = JSON.parse(data);
          ws.send(JSON.stringify(json));
        });
      }
    );

    req.on("error", (error) => {
      console.log(error);
    });

    req.end();
  }, 5000);

  ws.on("message", (data) => {
    console.log("client has sent us " + data);
  });

  ws.on("close", () => {
    console.log("closed");
  });
});
