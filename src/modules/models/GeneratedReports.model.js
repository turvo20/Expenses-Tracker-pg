import { Sequelize } from "sequelize";
import { sequelizeInstance as db } from "../../config/index.js";

const { DataTypes, UUIDV4, Model, NOW } = Sequelize


export default class GeneratedReportModel extends Model {}

GeneratedReportModel.init({
    report_id :{
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    user_id :{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    report_name :{
        type: DataTypes.STRING,
        allowNull: false
    },
    report_date :{
        type: DataTypes.DATE,
        allowNull: false
    },
    report_data :{
        type: DataTypes.JSON,
        allowNull: false
    }
},{
    sequelize: db,
    modelName: 'GeneratedReportModel',
    tableName: 'GeneratedReports'
})