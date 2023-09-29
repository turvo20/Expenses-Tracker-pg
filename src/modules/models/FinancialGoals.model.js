import { Sequelize } from "sequelize";
import { sequelizeInstance as db } from "../../config/index.js";

const { DataTypes, UUIDV4, Model, NOW } = Sequelize


export default class FinancialGoalModel extends Model {}



FinancialGoalModel.init({
    goal_id:{
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
    goal_name :{
        type:DataTypes.STRING,
        allowNull:false
    },
    target_amount :{
        type:DataTypes.DECIMAL(10, 2),
        allowNull:false
    },
    start_date :{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:NOW()
    },
    end_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    current_progress :{
        type:DataTypes.DECIMAL(10, 2),
        allowNull:false
    }
},{
    sequelize:db,
    modelName:'FinancialGoal'
})