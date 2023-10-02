import ExpensesService from "../modules/expenses/Expenses.service.js";

const CreateExpense = async (req, res) => {
    const userid = req.user.userId
    try {
        const expense = await ExpensesService.CreateExpense(req.body, userid);
        if (!expense.ok) {  
            return res.status(expense.status).json({ok:expense.ok, message:expense.message})
        }
        const { status,...exp} = expense
        res.status(status).json(exp);

    } catch (error) {
        res.status(500).json(error);
    }

}

const GetExpense = async (req, res) => { 
    const id = req.params.id;
    const userid = req.user.userId
    try {
        const expense = await ExpensesService.GetExpense(id,userid);
        if (!expense.ok) {  
            return res.status(expense.status).json({ok:expense.ok, message:expense.message})
        }
        const { status,...exp} = expense
        res.status(status).json(exp);
        
    } catch (error) {
        res.status(500).json(error);
    }
}

 const GetExpenses = async (req, res) => { 
    const userid = req.user.userId
    // console.log(req.user)
    // console.log(userid)
    try {
        const expense = await ExpensesService.GetExpenses(userid);
        
        // console.log(expense)
        // console.log( status)
        const { status,...exp} = expense
        if (!expense.ok) {  
            return res.status(status).json({ok:exp.ok, message:exp.message})
        }
        
        res.status(status).json(exp);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ok:false, msg:error.message});
    }
 }  


const UpdateExpense = async (req, res) => {
     const id = req.params.id;
     const userid = req.user.userId
     try {
        const expense = await ExpensesService.UpdateExpense(id,req.body,userid );
        if (!expense.ok) {  
            return res.status(expense.status).json({ok:expense.ok, message:expense.message})
        }
        const { status,...exp} = expense
        res.status(status).json(exp);
        
    } catch (error) {
        res.status(500).json({ok: false , message:error.message});
    }
    
}

const DeleteExpense = async (req, res) => {
    const id = req.params.id;
    // const userid = req.user.userId
    try {
        const expense = await ExpensesService.DeleteExpense(id);
        if (!expense.ok) {  
            return res.status(expense.status).json({ok:expense.ok, message:expense.message})
        }
        const { status,...exp} = expense
        res.status(status).json(exp);
        
    } catch (error) {
        res.status(500).json(error);
    }
}

export default {
    CreateExpense,
    UpdateExpense,
    DeleteExpense,
    GetExpense,
    GetExpenses
}
 
