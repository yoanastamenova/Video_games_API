import mongoose from "mongoose";
import 'dotenv/config';



const gameSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})

        const games = [
            {
                _id: '66900b123a3d86e3304151ez',
                title: "Sekiro shadows die twice",
                description: "Samurai fighting with demons"
            },
            {
                _id: '66900b123a3d86e3304152ez',
                title: "Doom",
                description: "Zombies survival game"
            },
            {
                _id: '66900b123a3d86e3304153ez',
                title: "Super Mario Kart",
                description: "Super Mario themed karting racing game"
            },
            {
                _id: '66900b123a3d86e3304154ez',
                title: "Valorant",
                description: "Shooter tactical game"
            },
            {
                _id: '66900b123a3d86e3304155ez',
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

gameSeeder();