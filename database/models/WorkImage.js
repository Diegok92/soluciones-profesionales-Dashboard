const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Fotos Trabajos Realizados";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageTitle: Sequelize.STRING,
    professional_id: Sequelize.STRING,
  };
  const config = {
    tableName: "Fotos Trabajos Realizados",
    timestamps: false,
  };

  const WorkImage = sequelize.define(alias, cols, config);

  return WorkImage;
};
