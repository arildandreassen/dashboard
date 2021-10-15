const { MongoClient } = require("mongodb");

const uri = "mongodb://root:rootpassword@mongodb:27017";

exports.get = (req, res) => {
  // Connect to MongoDB
  MongoClient.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        return console.log(err);
      }
      //   Specify database you want to access
      const db = client.db("dashboard");
      db.collection("api")
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray((err, data) => {
          client.close();
          res.send(data);
        });
    }
  );
};

exports.post = (req, res) => {
  if (!req.body.collection) {
    return res.status(400).json({
      error: "the collection is required",
    });
  }

  if (!req.body.result) {
    return res.status(400).json({
      error: "the result is required",
    });
  }

  if (typeof req.body.result != "object") {
    return res.status(400).json({
      error: "the result must be an object",
    });
  }

  MongoClient.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        return console.log(err);
      }

      //   Specify database you want to access
      const db = client.db("dashboard");
      db.collection(req.body.collection)
        .insertOne({
          passed: req.body.result.passed,
          failed: req.body.result.failed,
          created: new Date(),
        })
        .then(() => {
          client.close();
          return res.status(200).json({
            message: "po",
          });
        });
    }
  );
};
