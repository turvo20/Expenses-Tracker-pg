
import AuthServices from "./Auth.service.js";




let AuthController = {}


AuthController.Create = [
    async (req, res) =>{
        
        try {
            const resp = await AuthServices.Create({...req.body});
            res.status(200).json(resp)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: error.message});
        }
    }
]
AuthController.Login = [
    async (req, res) =>{
        try {
            const resp = await AuthServices.Login({...req.body});
            res.status(200).json(resp)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: error.message});
            
        }
    }
]

AuthController.Confirmar =[
    async (req, res) =>{
        try {
            const resp = await AuthServices.Confirmed({...req.params});
            res.status(200).json(resp)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: error.message});
            
        }
    }
]

AuthController.FindAll = [
    async (req, res) =>{
    
    }
]
AuthController.FindOne = [
    async (req, res) =>{
    
    }
]
AuthController.Update = [
    async (req, res) =>{
    
    }
]
AuthController.Dalete = [
    async (req, res) =>{
    
    }
]








export default AuthController;