import { Sequelize } from "sequelize";
import { sequelizeInstance as db } from "../../config/index.js";

const { DataTypes, UUIDV4, Model, NOW } = Sequelize

export default class RemindersModel extends Model {}



RemindersModel.init({
    reminder_id :{
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'User',
            key:'id'
        }
    },
    reminder_name :{
        type:DataTypes.STRING,
        allowNull:false
    },
    frequency:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nextreminderdate :{
        type:DataTypes.DATE,
        allowNull:false
    }
},{
    sequelize:db,
    modelName:'Reminders'
})