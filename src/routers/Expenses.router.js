import { Router } from 'express'
import { validarCampos } from '../Middleware/index.js'
import { check } from 'express-validator'
import authenticateMiddleware from '../Middleware/auth.middleware.js'
import ExpenseController from '../controllers/Expense.controller.js'

const ExpRouter = Router()


ExpRouter.get('/',authenticateMiddleware,ExpenseController.GetExpenses)
 ExpRouter.get('/:id',authenticateMiddleware,ExpenseController.GetExpense)
ExpRouter.post('/', 
authenticateMiddleware,
 [
    check('category_id').not().isEmpty(),
    check('description').not().isEmpty(),
    check('amount').not().isEmpty(),
    validarCampos   
 ],
 ExpenseController.CreateExpense)
 ExpRouter.put('/:id',authenticateMiddleware,
 [
    check('category_id').not().isEmpty(),
    check('description').not().isEmpty(),
    check('amount').not().isEmpty(),
    validarCampos
 ],
 ExpenseController.UpdateExpense)
ExpRouter.delete('/:id',authenticateMiddleware,ExpenseController.DeleteExpense)
 
 


export default ExpRouter;