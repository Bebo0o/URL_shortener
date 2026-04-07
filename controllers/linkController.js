const {
  createLink,
  getLinkByCode,
  incrementClicks,
  getAllLinks,
} = require("../models/linkModel");

const generateCode = require("../utils/generateCode");

exports.shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    const shortCode = generateCode();

    const link = await createLink(longUrl, shortCode);

    res.json({
      shortUrl: `http://localhost:3000/${shortCode}`,
      data: link,
    });a
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const code = req.params.code;
    const link = await getLinkByCode(code);

    if (!link) return res.status(404).send("Not found");

    await incrementClicks(code);

    res.redirect(link.long_url);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getStats = async (req, res) => {
  try {
    const links = await getAllLinks();
    res.json(links);
  } catch (err) {
    res.status(500).send(err.message);
  }
};