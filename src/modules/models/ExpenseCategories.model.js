import { Sequelize } from "sequelize";
import { sequelizeInstance as db } from "../../config/index.js";

const { DataTypes, UUIDV4, Model, NOW } = Sequelize



export default class CategoriesModel extends Model{}


CategoriesModel.init({
    category_id:{
        autoIncrement: true,
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true
    },
    category_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        values: ['expense','income'],
        defaultValue: 'expense'
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
},{
    sequelize:db,
    modelName:'ExpenseCategories'
})