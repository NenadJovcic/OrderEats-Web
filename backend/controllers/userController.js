import User from "../models/userSchema.js"

const userController = {

    signup_get: async (req, res) => {
        const user = await User.find();
        res.json(user)
    },

    signup_post: async (req, res) => {
        try {
            const { userName, email, password } = req.body;
            const user = await User.create({ userName, email, password });
            res.status(201).json(user);
        } catch (error) {
            throw error
        }
    },


}

export default userController