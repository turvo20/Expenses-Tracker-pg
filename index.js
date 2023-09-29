import express from "express";
import cors from "cors";
import conectardb from "./src/db/db.js";
import morgan from "morgan";
import helmet from 'helmet';
import path from 'path'

import authRouter from "./src/routers/Auth.router.js";

const app = express();

await conectardb();
app.use(express.json());
app.use(morgan('dev'))
app.use(helmet())
app.use(express.static(path.resolve('./src/public')))

// const dominiosPermitidos = [process.env.FRONTEND_URL];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (dominiosPermitidos.indexOf(origin) !== -1) {
//       // El Origen del Request esta permitido
//       callback(null, true);
//     } else {
//       callback(new Error("No permitido por CORS"));
//     }
//   },
// };

app.use(cors({ origin:'*'}));

app.use("/api/auth", authRouter);
// app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,"0.0.0.0", () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`)
})