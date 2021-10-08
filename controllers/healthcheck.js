exports.healthcheck = (req, res) => {
  res.status(200).json({
    message: "All systems are running",
  });
};
