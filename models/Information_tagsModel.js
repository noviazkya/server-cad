import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Information from "./InformationModel.js";

const { DataTypes } = Sequelize;

const Information_tags = db.define(
  "information_tags",
  {
    InformationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Information.hasMany(Information_tags);
Information_tags.belongsTo(Information, { foreignKey: "informationId" });

export default Information_tags;
