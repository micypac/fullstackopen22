const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { Bloguser } = require("../models");
const { SECRET } = require("../utils/config");

router.post("/", async (req, res) => {
  const body = req.body;

  const user = await Bloguser.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = router;
