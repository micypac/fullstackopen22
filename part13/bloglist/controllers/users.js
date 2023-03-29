const router = require("express").Router();

const { Blog, User } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: {
      model: Blog,
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
    },
  });

  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);

  res.json(user);
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.username = req.body.username;
    await user.save();
    return res.json(user);
  }

  res.status(404).end();
});

module.exports = router;
