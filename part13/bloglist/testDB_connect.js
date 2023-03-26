require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URI);

const main = async () => {
  try {
    await sequelize.authenticate();

    console.log("Connection to Postgres DB has been established successfully.");

    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the Postgres DB: ", error);
  }
};

main();
