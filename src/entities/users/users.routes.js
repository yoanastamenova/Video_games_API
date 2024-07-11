import { Router } from "express";
import { login, register } from "./users.controller.js";

const router = Router()

router.post('/register', register)        // to register a new user
router.post('/login', login)             // to login user

export { router }