import User from "../models/userSchema.js"
import bcrypt from 'bcrypt'




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
        res.send("Invalid email or password")
    } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.status(201).json({ user: user._id });
            console.log('user logged in')
        } else {
            res.send("Invalid email or password");
        }
    }

}

export const user_delete = async (req, res) => {
    await User.deleteMany({})
}