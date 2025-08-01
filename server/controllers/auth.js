import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// REGISTER USER
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            location,
            occupation,
        } = req.body;

        
        const picturePath = req.file ? req.file.filename : "";  // Default to empty if no file is uploaded
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        const userObject = savedUser.toObject();
        delete userObject.password;
        
        res.status(201).json(userObject);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// LOGGING IN

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({msg: "user does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials. "});

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
        const userToObject = user.toObject();
        delete userToObject.password;
        res.status(200).json({token, user});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}