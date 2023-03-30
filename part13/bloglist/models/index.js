const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");

User.hasMany(Blog);
Blog.belongsTo(User);
// Blog.sync({ alter: true });
// Bloguser.sync({ alter: true });

User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList, as: "readers" });

module.exports = {
  Blog,
  User,
  ReadingList,
};
