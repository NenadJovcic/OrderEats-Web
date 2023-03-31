import User from "../models/userSchema.js"



    export const signup_get = async (req, res) => {
        const user = await User.find();
        res.json(user)
    }

    export const signup_post = async (req, res) => {
        try { 
            const { userName, email, password } = req.body;
            const user = await User.create({ userName, email, password });
            res.status(201).json(user);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    }