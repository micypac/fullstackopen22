const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { User, Session } = require("../models");
const { SECRET } = require("../utils/config");

router.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({
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

  if (user.disabled) {
    return res.status(401).json({
      error: "account disabled, please contact admin",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  await Session.create({
    userId: user.id,
    token,
  });

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = router;
