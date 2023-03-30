const router = require("express").Router();
const { ReadingList } = require("../models");
const { tokenExtractor } = require("../utils/middlewares");

router.post("/", async (req, res) => {
  const reading = await ReadingList.create(req.body);

  res.status(201).json(reading);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);

  if (readingList) {
    if (readingList.userId === req.decodedToken.id) {
      readingList.read = req.body.read;
      readingList.save();
      res.json(readingList);
    } else {
      res.status(401).json({ error: "blog not on your reading list" });
    }
  } else {
    res.status(404).end();
  }
});

module.exports = router;
