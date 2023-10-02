import { CategoriesModel } from "../models/index.js";

const CategorieService = {}


CategorieService.Create = async (data)=> {
    const { category_name } =  data

    if(!category_name) return {ok:false, msg:"El Nombre no puede estar vacio"}
    const resp = await CategoriesModel.create(data)

    return {
        ok:true,
        msg:'Categories created successfully',
        data: resp
    }
}
CategorieService.FindAll = async ()=> {


    const resp = await CategoriesModel.findAll({where:{is_active:true}});
     if(!resp) return {ok:false, msg:"No se encontraron categorias"}

     const data = resp.map(category => category.toJSON()); // Mapea los resultados a objetos JSON

    if (data.length <= 0) {
        return { ok: false, msg: "No se encontraron Categorias" };
        
    }
    return {
        ok:true,
        data: data
    }

}

CategorieService.UpdatedCategory = async (category_id,data)=> { 
    const { category_name } =  data

 
    if(!category_id) return {ok:false, msg:"El Id no puede estar vacio"}
    if(!category_name) return {ok:false, msg:"El Nombre no puede estar vacio"}

    const category = await CategoriesModel.findOne({where:{category_id}})

    if(!category) return {ok:false, msg:"No se encontraron categorias"}

    const resp = await CategoriesModel.update(data,{
        where:{
            category_id
        }
    })
    const cat = await CategoriesModel.findOne({where:{category_id:resp}})

    return {
        ok:true,
        msg:'Category updated successfully',
        data: cat
    }
 }

 CategorieService.DeleteCategory = async (category_id)=> { 
    if(!category_id) return {ok:false, msg:"El Id no puede estar vacio"}
     const resp = await CategoriesModel.findOne({
        where:{
            category_id,
            is_admin:false
        }
        
    })
    if(!resp) return {ok:false, msg:"No se encontraron categorias"}
    resp.is_active = false;
     await resp.save();
     
      return {
        ok:true,
        msg:'Category deleted successfully',
        data: resp
    }
  }


export default  CategorieService;