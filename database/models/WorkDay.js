const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Dias de Trabajo";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    workDay: Sequelize.STRING,
  
  };
  const config = {
    tableName: "WorkDays",
    timestamps: false,
  };

  const WorkDay = sequelize.define(alias, cols, config);

  return WorkDay;
};