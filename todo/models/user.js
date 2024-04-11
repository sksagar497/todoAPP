"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: "userId" });
    }
    // toJSON() {
    //   return{...this.get(), id:undefined}
    // }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.STRING,
      country: DataTypes.STRING,
      hobbies: DataTypes.STRING,
      password: DataTypes.STRING,
      mobile: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "Users",
      modelName: "User",
    }
  );
  return User;
};
