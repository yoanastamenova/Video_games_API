import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createComment } from "./comments.controller.js";

const commentsRouter = Router();


commentsRouter.post('/', auth, createComment);


export { commentsRouter }