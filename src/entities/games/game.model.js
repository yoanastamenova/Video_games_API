import { Schema, model } from "mongoose";

const GameSchema = new Schema(
    {
        title: { 
            type: String, 
            require: true
        },
        description: {
            type:  String
        },
        userFavourites: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Game = model('Game', GameSchema)

export default Game;