import CategorieService from "../modules/expenses/Categories.service.js";


const CreateCategory = async (req, res, next) => {
    try {
        const category = await CategorieService.Create(req.body);
        if (!category.ok) {
            return res.status(400).json(category);
        }
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json(error);
    }
}

const GetCategory = async (req, res, next) => {
    try {
        const category = await CategorieService.GetCategory(req.params.id);
        if (!category.ok) {
            return res.status(400).json(category);
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json(error);
    }
}
 const GetCategories = async (req, res, next) => {
    try {
        const categories = await CategorieService.FindAll();
        if (!categories.ok) {
            return res.status(400).json(categories);
        }
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
 }

const UpdateCategory = async (req, res, next) => {
    try {
        const category = await CategorieService.UpdatedCategory(req.params.id, req.body);
        console.log(category);
        if (!category.ok) {
            return res.status(400).json(category);
        }
        res.status(200).json(category);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}

const DeleteCategory = async (req, res, next) => {
    try {
        const category = await CategorieService.DeleteCategory(req.params.id);
        if (!category.ok) {
            return res.status(400).json(category);
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json(error);
    }
}

export default {
    CreateCategory,
    GetCategory,
    GetCategories,
    UpdateCategory,
    DeleteCategory
}