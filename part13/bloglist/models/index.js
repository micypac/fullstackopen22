const Blog = require("./blog");
const Bloguser = require("./bloguser");

Bloguser.hasMany(Blog);
Blog.belongsTo(Bloguser);
Blog.sync({ alter: true });
Bloguser.sync({ alter: true });

module.exports = {
  Blog,
  Bloguser,
};
