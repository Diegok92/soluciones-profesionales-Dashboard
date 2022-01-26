const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Zona de Trabajo";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    location: Sequelize.STRING,
  };
  const config = {
    tableName: "workzones",
    timestamps: false,
  };

  const WorkZone = sequelize.define(alias, cols, config);

  return WorkZone;
};
