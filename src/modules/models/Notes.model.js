import { Sequelize } from "sequelize";
import { sequelizeInstance as db } from "../../config/index.js";

const { DataTypes, UUIDV4, Model, NOW } = Sequelize

export default class NoteModel extends Model {}


 NoteModel.init({
    note_id:{
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
    note_title :{
        type:DataTypes.STRING,
        allowNull:false
    },
    note_content :{
        type:DataTypes.TEXT,
        allowNull:false
    }, 
    note_date :{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:NOW()
    },
 
 },{
     sequelize:db,
     modelName:'NoteModel',
     tableName:'note'
 })

