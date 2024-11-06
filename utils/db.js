const Sequelize = require("sequelize");
const sequelize = new Sequelize("projectmanagement", "root", "mani", {
  host: "localhost",
  dialect: "mysql",
});
console.log("Database conneccted");
module.exports = sequelize;
  