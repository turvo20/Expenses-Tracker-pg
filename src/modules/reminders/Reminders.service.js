import { RemindersModel } from "../models";




const RemindersService = {}

RemindersService.createReminder = async (data) => {
    const userid = data.user.userId

    const reminderDTO = {
        ...data,
        user_id: userid
    }
    const reminder = await RemindersModel.create(reminderDTO)

     if (!reminder){
        return {
            ok: false,
            status: 400,
            message: "Reminder could not be created"
        }
     }
     return {
        ok: true,
        status: 201,
        message: "Reminder created successfully",
        reminder: reminder
     }

    
}
 RemindersService.getAllReminders = async () => {
    const reminders = await RemindersModel.findAll()
    if (!reminders){
        return {
            ok: false,
            status: 400,
            message: "Reminders could not be fetched"
        }
    }
    return {
        ok: true,
        status: 200,
        message: "Reminders fetched successfully",
        reminders: reminders
    }
 }
 RemindersService.getReminderById = async (id) => {
    const reminder = await RemindersModel.findByPk(id)
    if (!reminder){
        return {
            ok: false,
            status: 400,
            message: "Reminder could not be fetched"
        }
    }
    return {
        ok: true,
        status: 200,
        message: "Reminder fetched successfully",
        reminder: reminder
    }
 }
 RemindersService.updateReminder = async (id, data) => {
    const reminder = await RemindersModel.findByPk(id)
    if (!reminder){
        return {
            ok: false,
            status: 400,
            message: "Reminder could not be updated"
        }
    }
    const updatedReminder = await reminder.update(data)
    if (!updatedReminder){
        return {
            ok: false,
            status: 400,
            message: "Reminder could not be updated"
        }
    }
    return {
        ok: true,
        status: 200,
        message: "Reminder updated successfully",
        reminder: updatedReminder
    }
 }

 RemindersService.deleteReminder = async (id) => {
    const reminder = await RemindersModel.findByPk(id)
    if (!reminder){
        return {
            ok: false,
            status: 400,
            message: "Reminder could not be deleted"
        }
    }
    const deletedReminder = await reminder.destroy()
    if (!deletedReminder){
        return {
            ok: false,
            status: 400,
            message: "Reminder could not be deleted"
        }
    }
    return {
        ok: true,
        status: 200,
        message: "Reminder deleted successfully",
        reminder: deletedReminder
    }
 }




















export default RemindersService;