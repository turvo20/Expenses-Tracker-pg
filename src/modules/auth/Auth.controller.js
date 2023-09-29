
import AuthServices from "./Auth.service.js";

export const createUser = async (req, res) =>{
        
    try {
        const resp = await AuthServices.Create({...req.body});
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message});
    }
}
export const LoginUser =  async (req, res) =>{
    try {
        const resp = await AuthServices.Login({...req.body});
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message});
        
    }
}

export const Confirmar = async (req, res) =>{
    try {
        const resp = await AuthServices.Confirmed({...req.params});
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message});
        
    }
}



