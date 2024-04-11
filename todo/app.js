const { sequelize } = require("./models");

async function main() {
  console.log("syncing");
  await sequelize.sync({ alter: true });
}

main();
