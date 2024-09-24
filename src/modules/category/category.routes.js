import { Router } from "express";
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { categoryValidation } from "./category.validation.js";
import { subCategoryRouter } from "../subCategory/subcategory.routes.js";
import { allowedTo, protectedRoute } from "../authentication/auth.controller.js";


export const categoryRouter = Router()
categoryRouter.use('/:id/subCategories', subCategoryRouter)
categoryRouter.route('/').post(protectedRoute, allowedTo('admin'), uploadSingleFile('image', 'categories'), validate(categoryValidation), addCategory).get(getCategories)
categoryRouter.route('/:id').get(getCategory).delete(protectedRoute, allowedTo('Admin'), deleteCategory).put(protectedRoute, allowedTo('Admin'), updateCategory)