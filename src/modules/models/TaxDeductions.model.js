import { Sequelize } from "sequelize";
import { sequelizeInstance as db } from "../../config/index.js";

const { DataTypes, UUIDV4, Model, NOW } = Sequelize

export default class TaxDeductionModel extends Model {}

TaxDeductionModel.init({
    taxdeduction_id :{
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    user_id :{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'User',
            key:'id'
        }
    },
    deduction_name :{
        type: DataTypes.STRING,
        allowNull: false
    },
    deduction_amount :{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    deduction_date :{
        type: DataTypes.DATE,
        allowNull: false
    },
},{
    sequelize: db,
    tableName: 'TaxDeduction',
    timestamps: false
})