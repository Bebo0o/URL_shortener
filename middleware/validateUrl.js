const validator = require("validator");

module.exports = (req, res, next) => {
  const { longUrl } = req.body;

  if (!validator.isURL(longUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  next();
};