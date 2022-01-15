const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Zona de Trabajo";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    province: Sequelize.STRING,
    district: Sequelize.STRING,
  };
  const config = {
    tableName: "WorkZones",
    timestamps: false,
  };

  const WorkZone = sequelize.define(alias, cols, config);

  return WorkZone;
};
