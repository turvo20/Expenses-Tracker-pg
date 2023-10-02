import { sequelizeInstance } from "../config/index.js"
import {CategoriesModel, ExpenseModel, UserModel} from "../modules/models/index.js"


const conectardb = async () => { 
    try {
        // Verifica que la instancia de Sequelize no sea nula o indefinida
        if (!sequelizeInstance) throw new Error('Error, sequelize instance is null or undefined')

        // ASSOCIATIONS

        ExpenseModel.belongsTo(UserModel, { foreignKey: 'user_id', onDelete: 'CASCADE' });

        ExpenseModel.belongsTo(CategoriesModel, { foreignKey: 'category_id', onDelete: 'CASCADE' });
         


        await sequelizeInstance.sync({ alter: true })
        .then(async () => {
            console.log('Connection to db has been succesful')
        })
        .catch(err => console.error(err))
    } catch (error) {
        console.log(error)
    }
}


export default conectardb;