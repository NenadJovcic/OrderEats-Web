import User from "../models/userSchema.js"



    export const signup_get = async (req, res) => {
        const user = await User.find();
        res.json(user)
    }

    export const signup_post = async (req, res) => {
        
            const { userName, email, password } = req.body;
            const checkEmail = await User.findOne({email: email})
            const checkName = await User.findOne({userName: userName})
            if(checkEmail){
                res.send("E-mail")
            } else if (checkName){
                res.send("Name")
            } else {
                const user = await User.create({ userName, email, password });
                res.status(201).json(user);
            }
       
    }