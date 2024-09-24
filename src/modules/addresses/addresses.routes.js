import { Router } from "express";

import { allowedTo, protectedRoute } from "../authentication/auth.controller.js";
import { addToaddresses, getaddresses, removeFromAdressess } from "./addresses.controller.js";


export const addressesRouter = Router()

addressesRouter.route('/')
    .patch(protectedRoute, allowedTo('User'), addToaddresses)
    .delete(protectedRoute, allowedTo('User'), removeFromAdressess)
    .get(protectedRoute, allowedTo('User'), getaddresses)
addressesRouter.route('/:id').delete(protectedRoute, allowedTo('User'), removeFromAdressess)
    
