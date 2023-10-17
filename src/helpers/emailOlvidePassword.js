// import { transporter } from "../config/index.js";
import nodemailer from 'nodemailer'
import { config } from '../config/index.js';

const emailOlvidePassword = async (datos) => {
  var transporter = nodemailer.createTransport({
    host: config.HOST_EMAIL,
    port: config.PORT_EMAIL,
    auth: {
      user: config.AUTH_EMAIL.user,
      pass: config.AUTH_EMAIL.pass
    }
  });

  const { email, nombre, token } = datos;

  //Enviar el email

  const info = await transporter.sendMail({
    from: "EXPENSES TRACKER - Administrador de Gastos Personales",
    to: email,
    subject: "Re-establece tu Password",
    text: "Re-establece tu Password",
    html: `
    
        <h1>EXPENSES TRACKER - Administrador de Gastos Personales </h1>
        <h3>Hola: ${nombre}, has solicitado re-establecer tu password.</h3>

        <p>Sigue el siguiente enlace para generar un nuevo password:
        <p>Codigo de recuperacion: ${token}</p>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `,
  },(error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', {...info});
    }
  });

  // console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;