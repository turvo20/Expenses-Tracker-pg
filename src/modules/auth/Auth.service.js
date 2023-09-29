import  argon from "argon2";
import { UserModel } from "../models/index.js";
import generatetoken from "../../helpers/jwt.js";


const AuthServices = {};



AuthServices.Create = async (data) =>{
    const {fullname,email, username,password} =data
    const exist =await  AuthServices.verifyAlreadyExist(email, username)
    console.log(exist.ok)
    if(exist.ok){
        return exist
    }
    const userDTO = {
        fullname ,
        username,
        email,
        password: await argon.hash(password),
        token: await generatetoken(username,email)
    }
    const user = await UserModel.create(userDTO)
    return {
        ok: true,
        msg: "User account created successfully",
        user
    }
};


AuthServices.Login = async (data) =>{
    const { email, password } = data;
    // Comprobar si el usuario existe
  const usuario = await UserModel.findOne({ where:{ email} });
//   console.log(usuario)
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return {ok:false, msg: error.message };
  }
  // Comprobar si el usuario esta confirmado
  if (!usuario.is_active) {
    const error = new Error("Tu Cuenta no ha sido confirmada");
    return {ok:false, msg: error.message };
  }

  // Revisar el password
  if (await argon.verify(usuario.password, password)) {
    // Autenticar
    return{
        ok:true,
      id: usuario.id,
      nombre: usuario.username,
      email: usuario.email,
      token: generatetoken(usuario.username,usuario.email),
    };
  } else {
    const error = new Error("El Password es incorrecto");
    return {ok:false, msg: error.message };
  }
};

AuthServices.verifyAlreadyExist = async (email,username) => {
    const user = await UserModel.findOne({ where: { email,username } })
   
    if (user) {
        return { ok: true, msg: "User account already exists" };
    } else {
        return { ok: false, msg: "User account does not exist" };
    }
}

AuthServices.Confirmed = async (data)=>{
const {token} = data
  const usuarioConfirmar = await UserModel.findOne({ where:{token} });

  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return {ok:false, msg: error.message }
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.is_active = true;
    await usuarioConfirmar.save();

    return {ok:true, msg: "Usuario Confirmado Correctamente" };
  } catch (error) {
    console.log(error);
  }
}
export default AuthServices;