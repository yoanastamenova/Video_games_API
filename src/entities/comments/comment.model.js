import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
        message: { 
            type: String, 
            require: true
        },
        user: {
            type:  Schema.Types.ObjectId,        //coje el id del token del usuario para verificar la info
            ref: 'User',                       // es el modelo con que relaciona
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Comment = model('Comment', CommentSchema)       //usamos funcion que le pasamos el modelo y el nombre de la scherma

export default Comment;