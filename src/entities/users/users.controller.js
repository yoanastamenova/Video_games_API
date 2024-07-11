import bcrypt from 'bcrypt';
import User from './user.model.js';



export const register = async (req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Email and password are required!"
                }
            )
        }

        const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));

        const user = await User.create(
            {
                email: email,
                password: hashedPassword
            }
        )

        res.status(201).json(
            {
                success: true,
                message: "User created successfully!",
                data: user
            }
        )
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error registering user!",
                error: error.message
            }
        )
    }
}