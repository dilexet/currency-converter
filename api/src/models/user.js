import sequelize from "../../db-config.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
});


export const Role = sequelize.define("role", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: { type: DataTypes.STRING, allowNull: false },
});

Role.hasMany(User);
User.belongsTo(Role);