import { Router } from 'express'
import authRouter from "./Auth.router.js";
import ExpRouter from "./Expenses.router.js";
import CatRouter from './Categories.router.js';


const router = Router()

router.use('/auth', authRouter)
router.use('/expensess', ExpRouter)
router.use('/category', CatRouter)



export default router;