import { config } from "../../../../config";
import { UserModel } from "../../../models";
import jwt from 'jsonwebtoken'

const authenticateMiddleware = async (req, res, next) => {
    try {
        // Obtener el token de la solicitud (generalmente se encuentra en el encabezado Authorization)
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
        }

        // Verificar el token y decodificarlo
        const decodedToken = jwt.verify(token, config.TOKEN_SECRET); // Reemplaza 'JWT_SECRET' con tu secreto de JWT

        // Buscar al usuario en la base de datos por su ID (u otro identificador único)
        const user = await UserModel.findByPk(decodedToken.userId);

        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        // Asignar la información del usuario al objeto de solicitud (req.user)
        req.user = {
            userId: decodedToken.userId,
            tenantId: user.tenant_id,
        };

        next(); // Continuar con la ejecución de la ruta
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Token de autenticación inválido' });
    }
};

export default authenticateMiddleware;