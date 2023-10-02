import { ExpenseModel } from "../models/index.js";



const ExpensesService = {}


ExpensesService.CreateExpense = async (data,userID) => {

const { description, amount, category_id } = data;
if (!description ||!amount, !category_id) {
     return {
        ok: false,
        status: 400,
        message: "Please provide description and amount"
     }
    }
    const expenseDTO = {
        user_id: userID,
        category_id,
        description,
        amount,
    }
    const expense = await ExpenseModel.create(expenseDTO);


    return {
        ok: true,
        status: 201,
        message: "Expense created successfully",
        data: expense
    }

}

ExpensesService.GetExpense = async (id,userID) => {
    const expense = await ExpenseModel.find( {where:{ expense_id:id, user_id: userID, is_active: true }} );
    if (!expense) {
        return {
            ok: false,
            status: 404,
            message: "Expense not found"
        }
    }
    return {
        ok: true,
        status: 200,
        message: "Expense retrieved successfully",
        data: expense
    }
}

ExpensesService.GetExpenses = async (userID) => {
    const expenses = await ExpenseModel.findAll( { where: { user_id: userID, is_active: true }} );
    if (!expenses) {
        return {
            ok: false,
            status: 404,
            message: "Expenses not found"
        }
    }
     const data = await expenses.map(expense => expense.toJSON());
     if (data.length <= 0) {
        return { ok: false, status:400, message: "Expenses not found" };
        
    }
    return {
        ok: true,
        status: 200,
        message: "Expenses retrieved successfully",
        data: expenses
    }
}

ExpensesService.UpdateExpense = async (id, data, userID) => {
    const { description, amount } = data;
    if (!description ||!amount  ) { 
        return {
            ok: false,
            status: 400,
            message: "Please provide description and amount"
        }
    }
    const expense = await ExpenseModel.findOne( { where: { expense_id:id, user_id: userID, is_active: true }} );
    if (!expense) {
        return {
            ok: false,
            status: 404,
            message: "Expense not found"
        }
    }
    const NewExpense = await ExpenseModel.update( data,{ where: { expense_id:id, user_id: userID, }});
    if (!NewExpense) {
        return {
            ok: false,
            status: 404,
            message: "Expense not updated"
        }
    }
    const exp = await ExpenseModel.findOne( { where: { expense_id:id, user_id: userID}});
    return {
        ok: true,
        status: 200,
        message: "Expense updated successfully",
        data: exp
    }
}

ExpensesService.DeleteExpense = async (id) => {
    const expense = await ExpenseModel.findById(id);
    if (!expense) {
        return {
            ok: false,
            status: 404,
            message: "Expense not found"
        }
    }
    expense.is_active = false;
    await expense.save();
    return {
        ok: true,
        status: 200,
        message: "Expense deleted successfully",
        
    }
}




export default ExpensesService;