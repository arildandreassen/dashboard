const { MongoClient } = require("mongodb");

function updateDb(body) {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb://root:rootpassword@localhost:27017";

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

      // Specify database you want to access
      const dashboard = client.db("dashboard");
      console.log(`MongoDB Connected: ${uri}`);
      dashboard
        .collection(body.collection)
        .insertOne({ name: body.result.name })
        .then(() => {
          client.close();
        });
    }
  );
}

module.exports = { updateDb };
