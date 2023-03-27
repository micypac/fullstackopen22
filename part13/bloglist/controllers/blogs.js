const router = require("express").Router();
const { Blog } = require("../models");

// middleware for single blog
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }

  res.status(204).end();
});

module.exports = router;
