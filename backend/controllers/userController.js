import User from "../models/userSchema.js"

const userController = {

    signup_get: async (req, res) => {
        const user = await User.find();
        res.json(user)
    },

    signup_post: async  (req, res) => {
        try {
            const user = await User.create(req.body)
            res.status(201).json(user);
        } catch (error) {
            throw error
        }
    },


}

export default userController