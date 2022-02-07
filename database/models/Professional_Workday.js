const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "professionals_workdays";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    workDay_id: Sequelize.STRING,
    professional_id: Sequelize.STRING,
    shift_id: Sequelize.STRING,
  };
  const config = {
    tableName: "professionals_workdays",
    timestamps: false,
  };

  const Professional_WorkDay_Shift = sequelize.define(alias, cols, config);



  
  return Professional_WorkDay_Shift;
};
