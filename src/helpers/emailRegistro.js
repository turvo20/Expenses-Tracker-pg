import nodemailer from 'nodemailer'
import { config } from '../config/index.js';

const emailRegistro = async (datos) => {
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
    subject: "Comprueba tu cuenta en EXPENSES TRACKER ",
    text: "Comprueba tu cuenta en EXPENSES TRACKER ",
    html: `<p>Hola: ${nombre}, comprueba tu cuenta en EXPENSES TRACKER .</p>
        <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a> </p>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailRegistro;