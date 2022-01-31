const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Professional";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emergency: Sequelize.INTEGER, //si no anda pasarlo a string (mokaroo da 1/0)
    whyMe: Sequelize.TEXT,
    price: Sequelize.INTEGER,
    cbu: Sequelize.BIGINT,
    licence: Sequelize.STRING,
    client_id: Sequelize.STRING,
    professional_profession_id: Sequelize.STRING,
    workZone_id: Sequelize.STRING,
    professional_WorkDay_id: Sequelize.STRING,
    workImage_id: Sequelize.STRING,
  };
  const config = {
    tableName: "professional",
    timestamps: false,
  };

  const Professional = sequelize.define(alias, cols, config);

  Professional.associate = function(models){ 

    Professional.belongsToMany(models.Profession, {

      as: "professions",  //nombre de la asociación
      through: "professionals_profession",
      foreignKey: "professional_id",
      otherKey : "profession_id",
      timestamps: false
    });

    Professional.belongsTo(models.Client, {
      as: "clients",
      foreignKey: "client_id"
    });

    Professional.hasMany(models.WorkImage, {
      as: "workImages",
      foreignKey: "workImage_id"
    });

    Professional.belongsTo(models.WorkZone, {
      as: "workZones",
      foreignKey: "workZone_id"
    });

    Professional.belongsToMany(models.Shift, {

      as: "shift",  //nombre de la asociación
      through: "professionals_workDays",
      foreignKey: "professional_id",
      otherKey : "workDay_id",
      otherKey : "shift_id",
      timestamps: false
    });

    Professional.belongsToMany(models.WorkDay, {

      as: "workDays",  //nombre de la asociación
      through: "professionals_workDays",
      foreignKey: "professional_id",
      otherKey : "workDay_id",
      otherKey : "shift_id",
      timestamps: false
    });

  };

  return Professional;
};
