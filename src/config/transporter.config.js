import nodemailer from "nodemailer";

import config from './constants.config.js';


const transporter = nodemailer.createTransport({
    host: config.HOST_EMAIL,
    port: config.PORT_EMAIL,
    auth: {
      user: config.AUTH_EMAIL.user,
      pass: config.AUTH_EMAIL.password,
    },
  });



  export default transporter;