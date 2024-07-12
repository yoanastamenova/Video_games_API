import mongoose from "mongoose";
import 'dotenv/config';
import Comment from "../../entities/comments/comment.model.js";

const commentSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{})

        const comments = [
            {
                message: "My favourite game! 10/10!!",
                user: "66900b123a3d86e3304153ea"
            },
            {
                message: "I love this game art! It makes me happy!",
                user: "66900b123a3d86e3304153ec"
            }
        ]

        await Comment.insertMany(comments)

        console.log('===================')
        console.log('Comments seeder executed successfully!')
        console.log('===================')
    } catch (error) {
        console.log('===================')
        console.log('Error in comments seeder execution:', error)
        console.log('===================')

    } finally {
        await mongoose.connection.close()
    }
}

export default commentSeeder