const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Shift";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    shift: Sequelize.STRING,
  };
  const config = {
    tableName: "shifts",
    timestamps: false,
  };

  const Shift = sequelize.define(alias, cols, config);


Shift.associate = function(models){


  Shift.belongsToMany(models.Professional, {

    as: "professionals",  //nombre de la asociación
    through: "professionals_workDays",
    foreignKey: "shift_id",
    otherKey : "workDay_id",
    otherKey :"professional_id",
    timestamps: false
  });




}



  return Shift;
};
