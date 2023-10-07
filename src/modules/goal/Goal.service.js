import { FinancialGoalModel } from "../models";



const GoalService = {}

GoalService.CreateGoal = async (data) => {
    const userID = data.user.userId
    
    const goalDTO = {
        ...data,
        user_id: userID,
    }
     const goal = await FinancialGoalModel.create(goalDTO)
     if (!goal) {
         return {
             ok: false,
             status: 404,
             message: "Goal not created"
         }
     }
     return {
        ok: true,
        status: 201,
        message: "Goal created successfully",
        data: goal
     }



}

GoalService.GetGoal = async (id) => {
    const userID = data.user.userId

    const goal = await FinancialGoalModel.findOne({ where: { goal_id: id, user_id:userID } });
    if (!goal) {
        return {
            ok: false,
            status: 404,
            message: "Goal not found"
        }
    }
    return {
        ok: true,
        status: 200,
        message: "Goal retrieved successfully",
        data: goal
    }
}

GoalService.GetGoals = async () => {
    const userID = data.user.userId

    const goals = await FinancialGoalModel.findAll({where: {user_id: userID, is_active: true}});
    if (!goals) {
        return {
            ok: false,
            status: 404,
            message: "Goals not found"
        }
    }
     const data = await goals.map(goal => goal.toJSON());
     if (data.length <= 0) {
        return { ok: false, status:400, message: "Goals not found" };
        
    }
    return {
        ok: true,
        status: 200,
        message: "Goals retrieved successfully",
        data: goals
    }
}

GoalService.UpdateGoal = async (id, data) => {
    const userID = data.user.userId

    const goal = await FinancialGoalModel.findOne({ where: { goal_id: id, user_id:userID } });
    if (!goal) {
        return {
            ok: false,
            status: 404,
            message: "Goal not found"
        }
    }
    const NewGoal = await FinancialGoalModel.update( data,{ where: { goal_id:id, }});
    if (!NewGoal) {
        return {
            ok: false,
            status: 404,
            message: "Goal not updated"
        }
    }
    const go = await FinancialGoalModel.findById(id);
    return {
        ok: true,
        status: 200,
        message: "Goal updated successfully",
        data: go
    }
}

GoalService.DeleteGoal = async (id) => {
    const userID = data.user.userId
    
    const goal = await FinancialGoalModel.findOne({where: {goal_Id: id, user_id: userID}});
    if (!goal) {
        return {
            ok: false,
            status: 404,
            message: "Goal not found"
        }
    }
    goal.is_active = false;
    await goal.save();
    return {
        ok: true,
        status: 200,
        message: "Goal deleted successfully",
        
    }
     

}













export default GoalService;