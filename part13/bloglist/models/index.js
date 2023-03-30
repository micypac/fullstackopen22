const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");

User.hasMany(Blog);
Blog.belongsTo(User);
// Blog.sync({ alter: true });
// Bloguser.sync({ alter: true });

User.belongsToMany(Blog, { through: ReadingList, as: "read_list" });
Blog.belongsToMany(User, { through: ReadingList, as: "interested_readers" });

module.exports = {
  Blog,
  User,
};
