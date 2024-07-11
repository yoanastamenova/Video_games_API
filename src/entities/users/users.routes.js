import { Router } from "express";
import { register } from "./users.controller.js";

const router = Router()

router.post('/register', register)        // to register a new user

export { router }