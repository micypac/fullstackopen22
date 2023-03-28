const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../utils/db");
const { Blog, Bloguser } = require("../models");
const { SECRET } = require("../utils/config");

// *********** ROUTES

router.get("/", async (req, res) => {
  // *********** Using native SQL query
  // const rows = await sequelize.query(
  //   "SELECT author, sum(likes) AS likes_total, count(author) AS article_count FROM blogs GROUP BY author ORDER BY likes_total DESC",
  //   {
  //     type: QueryTypes.SELECT,
  //   }
  // );

  // const data = rows.map((row) => ({
  //   author: row.author,
  //   likes: row.likes_total,
  //   articles: row.article_count,
  // }));

  // res.json(data);

  // *********** Using sequelize query
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "total_likes"],
    ],
    group: ["author"],
    order: sequelize.literal("total_likes DESC"),
  });

  res.json(authors);
});

module.exports = router;
