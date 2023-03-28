require("dotenv").config();

module.exports = {
  DATABASE_URI: process.env.DATABASE_URI,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
};
