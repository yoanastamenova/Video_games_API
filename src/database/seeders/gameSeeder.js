import mongoose from "mongoose";
import 'dotenv/config';
import Game from "../../entities/games/game.model.js";

export const gameSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        const games = [
            {
                title: "Sekiro shadows die twice",
                description: "Samurai fighting with demons"
            },
            {
                title: "Doom",
                description: "Zombies survival game"
            },
            {
                title: "Super Mario Kart",
                description: "Super Mario themed karting racing game"
            },
            {
                title: "Valorant",
                description: "Shooter tactical game"
            },
            {
                title: "NBA 24k",
                description: "Basketball elite league game"
            }
        ]

        await Game.insertMany(games)

        console.log('===================')
        console.log('Games seeder executed successfully!')
        console.log('===================')
    } catch (error) {
        console.log('===================')
        console.log('Error in games seeder execution:', error)
        console.log('===================')
        
    } finally {
        await mongoose.connection.close()
    }
}

export default gameSeeder