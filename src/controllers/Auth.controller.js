
import AuthServices from "../modules/auth/Auth.service.js";

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

 export const olvidePassword = async (req,res) => {
    const email = req.body.email
    try {
        const resp = await AuthServices.olvidePassword(email);
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(400).json({ok:false, message: error.message});
    }
 }

 export const comprobarToken = async (req,res) => {
     const token = req.params.token
    try {
        const resp = await AuthServices.comprobarToken(token);
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(400).json({ok:false, message: error.message});
    }
 }

 export const nuevoPassword = async (req, res) => {
    const token = req.params.token 
    const {password} = req.body
    // console.log(password)
    try {
        const resp = await AuthServices.nuevoPassword(token, password);
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(400).json({ok:false, message: error.message});
    }
 }

 export const perfil = async (req, res) => {
    const userid = req.user.userId
    try {
        const resp = await AuthServices.UserPerfil(userid);
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(400).json({ok:false, message: error.message});
    }
 }

 export const actualizarPerfil = async (req, res) => {
    const id = req.params.id
    try {
        const resp = await AuthServices.actualizarPerfil(id,...req.body);
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(400).json({ok:false, message: error.message, error:error});
    }
 }


 export const actualizarPassword = async (req, res) => {
    const id = req.params.id
    try {
        const resp = await AuthServices.actualizarPassword(...req.body, id);
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        res.status(400).json({ok:false, message: error.message});
    }
 }
