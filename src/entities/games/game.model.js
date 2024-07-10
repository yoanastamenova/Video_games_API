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
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Game = model('Game', GameSchema)

export default Game;