import { Router } from 'express'

import { validarCampos } from '../Middleware/index.js'
import { check } from 'express-validator'
import { Confirmar, LoginUser, createUser } from '../modules/auth/auth.controller.js'




const authRouter = Router()
authRouter.get('/',(res)=>{
    res.send('funciona')
})
authRouter.post('/sing-in',
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], LoginUser)
authRouter.post('/sing-up',
[ // middlewares
        check('fullname', 'El nombre es obligatorio').not().isEmpty(),
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
],createUser)

authRouter.get('/confirmed/:token', Confirmar)

export default authRouter