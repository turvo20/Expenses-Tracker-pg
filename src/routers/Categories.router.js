import { Router } from 'express'
import { validarCampos } from '../Middleware/index.js'
import { check } from 'express-validator'
import authenticateMiddleware from '../Middleware/auth.middleware.js'
import CategoriesController from '../controllers/Categories.controller.js'


const CatRouter = Router()

CatRouter.get('/', authenticateMiddleware, CategoriesController.GetCategories)

CatRouter.get('/:id', authenticateMiddleware, CategoriesController.GetCategory)

CatRouter.post('/', 
authenticateMiddleware,
[
    check('category_name', 'El nombre es requerido').not().isEmpty(),
    validarCampos
], 
CategoriesController.CreateCategory)

CatRouter.put('/:id', 
authenticateMiddleware,
[
    check('category_name', 'El nombre es requerido').not().isEmpty(),
    validarCampos
]
, CategoriesController.UpdateCategory)

CatRouter.delete('/:id', authenticateMiddleware, CategoriesController.DeleteCategory)


 
export default CatRouter