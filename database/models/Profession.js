const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Profesiones";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    profession: Sequelize.STRING,
  };
  const config = {
    tableName: "professions",
    timestamps: false,
  };

  const Profession = sequelize.define(alias, cols, config);

  return Profession;
};
