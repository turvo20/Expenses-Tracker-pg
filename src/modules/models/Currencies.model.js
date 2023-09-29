import { Sequelize } from "sequelize";
import { sequelizeInstance as db } from "../../config/index.js";

const { DataTypes, UUIDV4, Model, NOW } = Sequelize

export default class CurrenciesModel extends Model {}


CurrenciesModel.init({
    currency_id :{
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    currency_name :{
        type: DataTypes.STRING,
        allowNull: false
    },
    exchange_rate :{
        type: DataTypes.FLOAT,
        allowNull: false
    }
},{
    sequelize: db,
    modelName: 'CurrenciesModel',
    tableName: 'Currencies'
})