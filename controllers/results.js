const { updateDb } = require("../services/mongodb");

exports.get = (req, res) => {
  return res.status(200).json({
    message: "ok",
  });
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

  updateDb(req.body);
  return res.status(200).json({
    message: "po",
  });
};
