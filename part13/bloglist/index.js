require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URI);
app.use(express.json());

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);

Blog.sync();

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs, null, 2));

  res.json(blogs);
});

// app.get("/api/notes/:id", async (req, res) => {
//   const note = await Note.findByPk(req.params.id);

//   if (note) {
//     console.log(note.toJSON());
//     res.json(note);
//   } else {
//     res.status(400).end();
//   }
// });

app.post("/api/blogs", async (req, res) => {
  console.log(req.body);

  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// app.put("/api/notes/:id", async (req, res) => {
//   const note = await Note.findByPk(req.params.id);

//   if (note) {
//     note.important = req.body.important;
//     await note.save();
//     res.json(note);
//   } else {
//     res.status(400).end();
//   }
// });

app.delete("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    try {
      await blog.destroy();
      res.status(200).json({ message: `Successfully deleted ${blog.title}` });
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    res.status(400).end();
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
