import { Sequelize } from "sequelize";
import { sequelizeInstance as db } from "../../config/index.js";

const { DataTypes, UUIDV4, Model, NOW } = Sequelize

export default class PersonalProjectModel extends Model {}

PersonalProjectModel.init({
    project_id :{
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
    project_name :{
        type:DataTypes.STRING,
        allowNull:false
    },
    project_budget :{
        type:DataTypes.INTEGER,
        defaultValue: 0
    },
    start_date :{
        type:DataTypes.DATE,
        defaultValue: NOW()
    },
    end_date :{
        type:DataTypes.DATE,
        
    },
    status :{
        type:DataTypes.ENUM,
        values:["Active","Completed"],
        defaultValue: "Active"
    },
},{
    sequelize: db,
    modelName: 'PersonalProject'
})