import { Sequelize } from "sequelize";
import { sequelizeInstance as db } from "../../config/index.js";
const { DataTypes, UUIDV4, Model, NOW } = Sequelize


export default class UserModel extends Model {}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: UUIDV4
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    web: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW()
    }
}, {
  sequelize:db, // Conectar al objeto Sequelize
  modelName: 'User', // Nombre del modelo (corresponde a la tabla en la base de datos)
});