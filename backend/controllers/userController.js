import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const test_get = async (req, res) => {
  const user = await User.find();
  res.json(user);
};



//? Create new user and hash password before saving to database
export const signup_post = async (req, res) => {
  const { email, password, userName } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    email: email,
    password: hashedPassword,
    userName: userName,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const login_post = async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(400).json({ message: "Invalid email or password" });
  } else {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      

      const token = jwt.sign(
        { _id: user._id, admin: user.isAdmin },
        process.env.TOKEN_SECRET || "secret",
        { expiresIn: "1d" }
      );
      // console.log(req.headers.authorization.split(" ")[1]);
      res.status(201).json({ token: token, user: user });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  }
};

export const user_delete = async (req, res) => {
  await User.deleteMany({});
};




//? Protect routes from unauthorized access and restrict access to certain roles (admin)
export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);
  if (!token) {
    res.status(401).json({ message: "Access denied" });
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET || "secret");
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
    }
  }
};


//? Restrict access to certain roles (admin)
export const restrictToAdmin = async (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    res.status(401).json({ message: "Access denied" });
  }
}

