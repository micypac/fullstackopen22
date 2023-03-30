const router = require("express").Router();
const { Session } = require("../models");
const { tokenExtractor } = require("../utils/middlewares");

router.post("/", tokenExtractor, (req, res) => {
  Session.destroy({
    where: {
      userId: req.decodedToken.id,
    },
  });

  res.status(200).end();
});

module.exports = router;
