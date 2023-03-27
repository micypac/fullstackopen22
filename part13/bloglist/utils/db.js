const Sequelize = require("sequelize");
const { DATABASE_URI } = require("./config");

const sequelize = new Sequelize(DATABASE_URI);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to the database");
  } catch (err) {
    console.log("Failed to connect to database");
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
