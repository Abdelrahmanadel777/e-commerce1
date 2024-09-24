import { Router } from "express";
import { addBrand, deleteBrand, getBrand, getBrands, updateBrand } from "./brand.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";


export const brandRouter = Router()
brandRouter.route('/').post(uploadSingleFile('logo', 'brands'), addBrand).get(getBrands)
brandRouter.route('/:id').put(uploadSingleFile('logo', 'brands'), updateBrand).delete(deleteBrand).get(getBrand)
