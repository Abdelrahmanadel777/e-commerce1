import { Router } from "express";
import { addSubCategory, deleteSubCategory, getSubCategories, getSubCategory, updateSubCategory } from "./subcategory.controller.js";
import { checkCategory } from "../../middleware/checkCategory.js";

export const subCategoryRouter = Router({mergeParams:true})
subCategoryRouter.route('/')
  .post(checkCategory, addSubCategory)
  .get(getSubCategories)
subCategoryRouter.route('/:id')
  .get(getSubCategory)
  .put(checkCategory, updateSubCategory)
  .delete(deleteSubCategory)