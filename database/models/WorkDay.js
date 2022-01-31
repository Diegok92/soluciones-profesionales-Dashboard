const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "WorkDay";
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

  WorkDay.associate = function(models){


    WorkDay.belongsToMany(models.Professional, {
  
      as: "professionals",  //nombre de la asociación
      through: "professionals_workDays",
      foreignKey: "workDay_id",
      otherKey : "shift_id",
      otherKey :"professional_id",
      timestamps: false
    })};


  return WorkDay;
};
