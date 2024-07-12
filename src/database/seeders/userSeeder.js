import mongoose from "mongoose";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import User from '../../entities/users/user.model.js'

export const userSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})

        const users = [
            {
                _id: '66900b123a3d86e3304153ea',
                username: "yoana",
                email: "yoana@banana.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
               },
               {
                _id: '66900b123a3d86e3304153eb',
                username: "morena",
                email: "more@morepe.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
               },
               {
                _id: '66900b123a3d86e3304153ec',
                username: "dani",
                email: "dani@dani.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
               },
               {
                _id: '66900b123a3d86e3304153ed',
                username: "admin",
                email: "admin@admin.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
               }
        ]

        await User.insertMany(users)

        console.log('===================')
        console.log('User seeder executed successfully!')
        console.log('===================')
    } catch (error) {
        console.log('===================')
        console.log('Error in execution of users seeder:', error)
        console.log('===================')
    } finally {
        await mongoose.connection.close()
    }
}

export default userSeeder