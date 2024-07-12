import bcrypt from 'bcrypt';
import User from './user.model.js';
import jwt from 'jsonwebtoken'



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

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(404).json(
                {
                    success: false,
                    message: "Email and password cannot be empty!"
                }
            )
        }

        const user = await User.findOne(
            {
              email: email
            }
       )

       if(!user){
        return res.status(400).json(
            {
                success: false,
                message: "Invalid email or password!"
            }
        )
       }

       const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
       )


       res.status(200).json(
        {
            success: true,
            message: "Logged in!",
            data: token
        }
       )
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error logging in user! Try again!",
                error: error.message
            }
        )
    }
}