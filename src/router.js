import { Router } from "express";
import { router as gamesRoutes} from "./entities/games/games.routes.js";
import { router as userRoutes} from "./entities/users/users.routes.js";

const router = Router()

router.use('/games', gamesRoutes)
router.use('/users', userRoutes)

export { router }