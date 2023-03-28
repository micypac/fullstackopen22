const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { Blog, Bloguser } = require("../models");
const { SECRET } = require("../utils/config");

// *********** MIDDLEWARES
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (err) {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

// *********** ROUTES

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where.title = {
      [Op.substring]: req.query.search,
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["bloguserId"] },
    include: {
      model: Bloguser,
      attributes: ["name"],
    },
    where,
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  const user = await Bloguser.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    bloguserId: user.id,
  });

  res.status(201).json(blog);
});

router.delete("/:id", [tokenExtractor, blogFinder], async (req, res) => {
  // const user = await Bloguser.findByPk(req.decodedToken.id);

  if (req.blog && req.blog.bloguserId === req.decodedToken.id) {
    await req.blog.destroy();
  }

  res.status(204).end();
});

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
