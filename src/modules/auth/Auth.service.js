import  argon from "argon2";
import { UserModel } from "../models/index.js";
import generatetoken from "../../helpers/jwt.js";
import emailOlvidePassword from "../../helpers/emailOlvidePassword.js";


const AuthServices = {};



AuthServices.Create = async (data) =>{
    const {fullname,email,telefono, username,password} =data
    const exist =await  AuthServices.verifyAlreadyExist(email, username)
    // console.log(exist.ok)
    if(exist.ok){
        return exist
    }
    const userDTO = {
        fullname ,
        username,
        telefono,
        email,
        password: await argon.hash(password),
        token: await generatetoken(username,email)
    }
    const user = await UserModel.create(userDTO)
    return {
        ok: true,
        message: "User account created successfully",
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
    return {ok:false, message: error.message };
  }
  // Comprobar si el usuario esta confirmado
  if (!usuario.is_active) {
    const error = new Error("Tu Cuenta no ha sido confirmada");
    return {ok:false, message: error.message };
  }

  // Revisar el password
  if (await argon.verify(usuario.password, password)) {
    // Autenticar
    return{
        ok:true,
      id: usuario.id,
      nombre: usuario.fullname,
      username: usuario.username,
      telefono: usuario.telefono,
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

AuthServices.UserPerfil = async (id) =>{
   const user = await UserModel.findOne({where:{id}});
   if(!user) {
      return {
        ok: false,
        status:400,
        message: 'User not found'
      }
   }

   return {ok: true, status:200, message: 'User successfully ', data: user}
}

AuthServices.olvidePassword = async (email) => {

  const existUser = await UserModel.findOne({ where: {email} });

  if (!existUser) {
    const error = new Error("El Usuario no existe");
    return {
      ok:false, 
      status:400,
      message: error.message 
    };
  }

  try {
    existUser.token = generatetoken(existUser.username,email);
    await existUser.save();

    // Enviar Email con instrucciones
   await emailOlvidePassword({
      email,
      nombre: existUser.fullname,
      token: existUser.token,
    });

    return {ok:true, message: "Hemos enviado un email con las instrucciones" };
  } catch (error) {
    console.log(error);
    return {ok:false, message: error.message}

  }
};

AuthServices.comprobarToken = async (token) => {

  const tokenValido = await UserModel.findOne({ where:{token} });
// console.log(tokenValido)
  if (tokenValido) {
    // El TOken es válido el usuario existe
    return{ ok:true,status:200,  message: "Token válido y el usuario existe" };
  } else {
    const error = new Error("Token no válido");
    return {ok:false ,status:400, message: error.message } ;
  }
};

AuthServices.nuevoPassword = async (token, password) => {
  const ususario = await UserModel.findOne({wwhere: {token} });
  if (!ususario) {
    const error = new Error("Hubo un error");
    return {
      ok: true,
      status:400,
      message:error.message
    };
  }

  try {
    // console.log(await argon.hash(password))
    ususario.token = null;
    ususario.password =await argon.hash(password);
    await ususario.save();
  return { ok:true, msg: "Password modificado correctamente",data: ususario };
  } catch (error) {
    console.log(error);
     return { ok:false, msg: error.message }
  }
};

AuthServices.actualizarPerfil = async (id, data) => {

  const usuario = await UserModel.findByPk(id);
  if (!usuario) {
    const error = new Error("Hubo un error");
    return {
      ok: true,
      status: 400,
      message: error.message
    };
  }

  if (usuario.email !== data.email) {
    const existeEmail = await UserModel.findOne({ where:{ email} });

    if (existeEmail) {
      const error = new Error("Ese email ya esta en uso");
      return {
          ok: false,
          status: 404,
          message: error.message
      };
    }
  }

  if(await !argon.verify(usuario.password, data.password)){
      usuario.password = await argon.hash(data.password)
  }

  try {
    usuario.fullname = data.fullname;
    usuario.email = data.email;
    usuario.web = data.web;
    usuario.telefono = data.telefono;


    const usuarioActualizado = await usuario.save();
    const { password, ...userData } = usuarioActualizado.dataValues; 
    return {
      ok: true,
      status: 200,
      data: userData
    }
  } catch (error) {
    console.log(error);
    return {ok: false, status: 404, message: error.message}
  }
};

AuthServices.actualizarPassword = async (data, id) => {
  // Leer los datos
  const { pwd_actual, pwd_nuevo } = data;

  // Comprobar que el ususario existe
  const ususario = await UserModel.findById(id);
  if (!ususario) {
    const error = new Error("Hubo un error");
    return {ok:false, status:400, message: error.message };
  }

  // Comprobar su password
  if (await !argon.verify(pwd_actual, pwd_nuevo)) {
    // Almacenar el nuevo password

    ususario.password = pwd_nuevo;
    await ususario.save();
    return {ok:true, message: "Password Almacenado Correctamente" };
  } else {
    const error = new Error("El Password Actual es Incorrecto");
    return {ok: false,  message: error.message };
  }

};




export default AuthServices;