const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const healthcheck = require("./routes/healthcheck");
const results = require("./routes/results");

app.listen(port, () => {
  console.log(`SERVER READY ON PORT ${port}`);
});

app.use("/", healthcheck);
app.use("/", results);
