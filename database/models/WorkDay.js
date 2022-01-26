const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Dias de Trabajo";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    day: Sequelize.STRING,
  };
  const config = {
    tableName: "workdays",
    timestamps: false,
  };

  const WorkDay = sequelize.define(alias, cols, config);

  return WorkDay;
};
