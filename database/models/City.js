const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Ciudades";
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
    tableName: "Ciudades",
    timestamps: false,
  };

  const City = sequelize.define(alias, cols, config);

  return City;
};
