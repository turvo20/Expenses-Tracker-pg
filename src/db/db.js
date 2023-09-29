import { sequelizeInstance } from "../config/index.js"



const conectardb = async () => { 
    try {
        // Verifica que la instancia de Sequelize no sea nula o indefinida
        if (!sequelizeInstance) throw new Error('Error, sequelize instance is null or undefined')

        // ASSOCIATIONS



        await sequelizeInstance.sync({ alter: false })
        .then(async () => {
            console.log('Connection to db has been succesful')
        })
        .catch(err => console.error(err))
    } catch (error) {
        console.log(error)
    }
}


export default conectardb;