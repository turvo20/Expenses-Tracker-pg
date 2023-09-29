import { Sequelize } from "sequelize";
import { sequelizeInstance as db } from "../../config/index.js";

const { DataTypes, UUIDV4, Model, NOW } = Sequelize


export default class PaymentMethodsModel extends Model {}

PaymentMethodsModel.init({
    paymentmethod_id :{
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
    method_name :{
        type: DataTypes.STRING,
        allowNull: false
    },
    card_number :{
        type: DataTypes.STRING,
        allowNull: false
    },  
},{
    sequelize: db,
    tableName: 'PaymentMethods',
    timestamps: false
})