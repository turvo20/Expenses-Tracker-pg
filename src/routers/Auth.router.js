import { Router } from "express";
import { validarCampos } from "../Middleware/index.js";
import { check } from "express-validator";
import {
  Confirmar,
  LoginUser,
  actualizarPassword,
  actualizarPerfil,
  comprobarToken,
  createUser,
  nuevoPassword,
  olvidePassword,
  perfil,
} from "../controllers/Auth.controller.js";
import authenticateMiddleware from "../Middleware/auth.middleware.js";

const authRouter = Router();
authRouter.get("/", (req, res) => {
  res.send("funciona");
});

authRouter.post(
  "/sing-in",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  LoginUser
);

authRouter.post(
  "/sing-up",
  [
    // middlewares
    check("fullname", "El nombre es obligatorio").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  createUser
);

authRouter.get("/confirmed/:token", Confirmar);

authRouter.post("/olvide-password",[
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
], olvidePassword);

authRouter
  .route("/olvide-password/:token")
  .get(comprobarToken)
  .post([
    check("password", "El password debe de ser de 6 caracteres").isLength({
        min: 6,
      }),
      validarCampos,
  ],nuevoPassword);

// Area privada
authRouter.get("/perfil", authenticateMiddleware, perfil);
authRouter.put("/perfil/:id",[
    // middlewares
    check("fullname", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("telefono", "Debe ser un Numero de Telefono Valido").isLength({
      min: 10,
    }),
    validarCampos,
  ], authenticateMiddleware, actualizarPerfil);
authRouter.put(
  "/actualizar-password",
  [
    check("password", "El password debe de ser de 6 caracteres").isLength({
        min: 6,
      }),
      validarCampos,
  ],
  authenticateMiddleware,
  actualizarPassword
);

export default authRouter;
