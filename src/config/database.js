const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "toko-express",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connectDB };
