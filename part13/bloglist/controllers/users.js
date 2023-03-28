const router = require("express").Router();

const { Blog, Bloguser } = require("../models");

router.get("/", async (req, res) => {
  const users = await Bloguser.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["bloguserId"] },
    },
  });

  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await Bloguser.create(req.body);

  res.json(user);
});

router.put("/:username", async (req, res) => {
  const user = await Bloguser.findOne({
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
