import express from "express";
import cors from "cors";
import { config } from "./src/config/index.js";
import conectardb from "./src/db/db.js";
import morgan from "morgan";
import helmet from "helmet";
import path from 'path'

const app = express();

app.use(express.json());
app.use(morgan('dev'))
app.use(helmet())
await conectardb();
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

// app.use("/api/veterinarios", veterinarioRoutes);
// app.use("/api/pacientes", pacienteRoutes);

const PORT = config.SERVER_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`)
})