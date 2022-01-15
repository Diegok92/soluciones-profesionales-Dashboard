const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const alias = "Profesionales";
  const cols = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emergency: Sequelize.BOOLEAN,//si no anda pasarlo a string
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
    tableName: "Professionals",
    timestamps: false,
  };

  const Professionals = sequelize.define(alias, cols, config);

  return Professionals;
};