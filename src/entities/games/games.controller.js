import Game from "./game.model.js";

export const createGame = async (req, res) => {
    try {
        //1. Recuperar la info
        const { title, description } = req.body;
        const body = req.body;

        //2. Verficiar la info obtenita
        if (!title || !description) {
            throw new Error("Title and description cannot be empty")
        }

        //3. Guardar la info en la BD

        const newGame = await Game.create(
            {
                title: title,
                description: description
            }
        )

        //4. Dar respuesta al usuario

        res.status(201).json(
            {
                success: true,
                message: "Game created successfully",
                data: newGame
            }
        )


    } catch (error) {

        if (error.message == 'Title and description cannot be empty') {
            return res.status(400).json(
                {
                    success: false,
                    message: "Title and description cannot be empty",
                    error: error.message
                }
            )
        }

        res.status(500).json(
            {
                success: false,
                message: "Error creating game!",
                error: error.message
            }
        )

    }
}

export const getAllGames = async (req, res) => {
    try {
        const games = await Game.find()
            .select('-updatedAt')
            .populate({
                path: 'userFavourites',
                select: "-password"
            })
            .populate(
                {
                    path: 'comments'
                }
            )

        res.status(200).json(
            {
                success: true,
                message: "All games retrived successfully!",
                data: games
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error showing all games!",
                error: error
            }
        )
    }
}

export const deleteGame = async (req, res) => {
    try {
        //1. Get the ID of the game we want to delete
        const gameID = req.params.id;

        //2. Verficar que existe este juego con este id
        const gameFinded = await Game.findById(gameID)

        if (!gameFinded) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Game not found!"
                }
            )
        }

        //3. Atacar la BD
        const gameDeleted = await Game.findByIdAndDelete(gameID)

        //4. Respond to the web page
        res.status(200).json(
            {
                success: true,
                message: "Game deleted successfully!",
                data: gameDeleted
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error deleting game!",
                error: error.message
            }
        )

    }
}

export const addFavouriteGame = async (req, res) => {
    try {
        const gameId = req.params.id;
        const userId = req.tokenData.id;

        const game = await Game.findById(gameId)

        if (!game) {
            return res.status(404).json({
                success: false,
                message: "Game does not exist!"
            })
        }
        console.log(game.userFavourites.includes(userId))

        if (!game.userFavourites.includes(userId)) {
            console.log(1)
            game.userFavourites.push(userId);
            await game.save();

            return res.status(200).json(
                {
                    success: true,
                    message: "Game added to favourites successfully!"
                }
            )
          
        }
        console.log(2)

        game.userFavourites.splice(game.userFavourites.indexOf(userId), 1)
        console.log(game.userFavourites)
        await game.save()

        res.json({
            success: true,
            message: "Game deleted from favourites",
        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "error adding user to favourite",
            error: error.message,
        });
    }
};