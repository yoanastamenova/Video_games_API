import Game from "./game.model.js";

export const createGame = async (req, res) => {
    try {
        console.log(1);
        //1. Recuperar la info
        const { title, description } = req.body;
        const body = req.body;

        //2. Verficiar la info obtenita
        if(!title || !description) {
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

        if(error.message == 'Title and description cannot be empty') {
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