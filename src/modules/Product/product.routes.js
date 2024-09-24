import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./product.controller.js";
import { uploadArrayFile } from "../../fileUpload/fileUpload.js";


export const productRouter = Router()
productRouter.route('/')
    .post(uploadArrayFile([{ name: 'imgCover', maxCount: 1 }, { name: "images", maxCount: 10 }], 'products'), addProduct)
    .get(getProducts)
productRouter.route('/:id')
    .put(uploadArrayFile([{ name: 'imgCover', maxCount: 1 }, { name: "images", maxCount: 10 }], 'products'), updateProduct)
    .delete(deleteProduct)
    .get(getProduct)
