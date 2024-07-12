import Game from '../games/game.model.js';
import Comment from './comment.model.js';

export const createComment = async (req, res) => {
    try {
        const userId = req.tokenData.id;
        const gameId = req.body.id;
        const message = req.body.message

        //TODO validar - que el juego existe, 

        const game = await Game.findById(gameId)     // si no existe no hay donde guardarlo el comment
         
        //atacar BD

        const newComment = await Comment.create({
            message: message,
            user: userId
        })
        

        game.comments.push(newComment._id)
        const addCommentToGame = await game.save()

        game.comments.includes(newComment._id)
        const removeCommentFromGame = await game.save()

        if(!newComment) {
            return res.status(404).json(
                {
                    success: false,
                    message: "The comment does not exists in order to be removed!"
                }
            )
        }

        res.status(201).json(
            {
                success: true,
                message: "Comment added successfully!",
                data: addCommentToGame
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error posting comment!",
                error: error.message
            }
        )
    }
}
