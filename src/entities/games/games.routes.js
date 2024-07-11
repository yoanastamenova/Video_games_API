import { Router } from "express";
import { createGame, deleteGame, getAllGames } from "./games.controller.js";

const router = Router()

router.post('/games', createGame)        // to create a new game
router.get('/games', getAllGames)        //to see all games
router.delete('/games/:id', deleteGame)        // to delete a game by its id


export { router }