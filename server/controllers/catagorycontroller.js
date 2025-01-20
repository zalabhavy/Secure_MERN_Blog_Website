import categoryModel from "../models/categoryMode.js"
class CategoryController
{
   static getAllCategories = async (req,res) => {
    try
    {
      const fetchAllCategories = await categoryModel.find({});
      return res.status(200).json(fetchAllCategories);
    }
    catch(error)
    {
      res.status(400).json({message:error.message});
    }
   };
   static addNewCategory = async (req,res) => {
      const {title} = req.body;
      try
      {
         if(title)
         {
            const newCategory = new categoryModel({
               title,
            });
            const savedCategory = await newCategory.save();
            if(savedCategory)
            {
               return res.status(200).json({message:"Category added successfully"});
            }
         }
         else
         {
             return res.status(400).json({message:"All fields are require"});
         }
      }
      catch(error)
      {
        res.status(400).json({message:error.message});
      }
   };
}
export default CategoryController;