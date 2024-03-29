require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URI);

const main = async () => {
  try {
    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    });

    for (let blog of blogs) {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    }

    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the db: ", error);
  }
};

main();
