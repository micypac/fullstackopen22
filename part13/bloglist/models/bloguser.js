const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Bloguser extends Model {}
Bloguser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "bloguser",
  }
);

module.exports = Bloguser;
