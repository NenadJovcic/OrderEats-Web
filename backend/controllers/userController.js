import User from "../models/userSchema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()




export const test_get = async (req, res) => {
    const user = await User.find();
    res.json(user)
}

export const signup_post = async (req, res) => {

    const { userName, email, password } = req.body;
    const checkEmail = await User.findOne({ email: email })
    const checkName = await User.findOne({ userName: userName })

    if (checkEmail) {
        res.send("E-mail")
    } else if (checkName) {
        res.send("Name")
    } else {
        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ userName, email, password: hashedPassword });
        res.status(201).json(user);

    }
}


export const login_post = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (!user) {

        res.status(400).json({ message: "Invalid email or password" })
    } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            console.log(user);


            const token = jwt.sign({ _id: user._id, admin: user.isAdmin }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
            res.status(201).header('auth-token', token).send(token)

        } else {
            res.status(400).json({ message: "Invalid email or password" })
        }
    }

}

export const user_delete = async (req, res) => {
    await User.deleteMany({})
}