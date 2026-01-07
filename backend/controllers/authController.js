const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User  = require("../models/User");

//REGISTER
exports.register = async (req,res) => {
    try {
        const {username, email, password, passwordAgain, role} = req.body;
        if(!username || !email  || !password || !passwordAgain) {
            return res.status(400).json({message: "User $ password required"});
        }

        const existingUser = await User.findOne({username});
        const existingEmail = await User.findOne({email});
        if(existingUser || existingEmail) {
            return res.status(400).json({message: "Username or email alaready exists"})
        }

        else if(!/\S+@\S+\.\S+/.test(email)) {
            return res.status(401).json({message:"The email entered is invalid."});
        }
        
        else if(password != passwordAgain) {
            return res.status(401).json({message: "The entered passwords do not match."});
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+=_\-)(*&^%$#@!])[A-Za-z\d+=_\-)(*&^%$#@!]{8,}$/;
        if(!passwordRegex.test(password)) {
            return res.status(400).json({message: "The password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password:hashedPassword, role});
        await user.save();

        res.status(201).json({message: "Registered successfully"});
    }
    catch {
        console.error("Register error");
        res.status(500).json({message: "server error"});
    }
};

//LOGIN
exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "Username & password required"});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({message: "email not found"});
        }

        const ok = await bcrypt.compare(password, user.password);
        if(!ok) {
            return res.status(401).json({message: "Worng passwrod"});
        }

        if(user.role === "user" && user.enable === false) {
            return res.status(401).json({message: "You are not yet allowed to enter."})
        }

        const token = jwt.sign({id: user._id, role: user.role}, "SECRET", {expiresIn: "1h"});
        res.status(200).json({message: "You have successfully logged in", token, email: user.email, role: user.role});
        // res.json({});
    }
    catch {
        console.error("Login error");
        res.status(500).json({message: "Server error"});
    }
}

//RESET PASSWORD
exports.resetPassword = async (req,res) => {
    try {
        const {username , email, password, passwordAgain } = req.body;
        if(!email || !username || !password || !passwordAgain) {
            return res.status(400).json({message: "All fields are required."});
        }

        const user = await User.findOne({username});
        if(!user || (user.email != email)) {
            return res.status(401).json({message: "username or email not found"});
        }
        if(password != passwordAgain) {
            return res.status(401).json({message: "password not required password again"});
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+=_\-)(*&^%$#@!])[A-Za-z\d+=_\-)(*&^%$#@!]{8,}$/;
        if(!passwordRegex.test(password)) {
            return res.status(400).json({message: "The password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(201).json({message: "reset password successfully"});
    }
    catch {
        res.status(500).json({message: "server error"});
    }
}