import { Router } from "express";
import { addFavouriteGame, createGame, deleteGame, getAllGames } from "./games.controller.js";
import { auth } from "../../middlewares/auth.js";


const router = Router()

router.post('/', createGame)        // to create a new game
router.get('/', getAllGames)        //to see all games
router.delete('/:id', deleteGame)        // to delete a game by its id
router.put('/add-user-favourite/:id', auth, addFavouriteGame)        //to add a user ID to a Game as its favourite , pasamos el ID de juego en la ruta y pasamos el id del usuario por token 

export { router }