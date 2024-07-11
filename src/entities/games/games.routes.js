import { Router } from "express";
import { createGame, deleteGame, getAllGames } from "./games.controller.js";

const router = Router()

router.post('/', createGame)        // to create a new game
router.get('/', getAllGames)        //to see all games
router.delete('/:id', deleteGame)        // to delete a game by its id


export { router }