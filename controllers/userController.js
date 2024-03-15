const User = require('../models/CustomerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require("express-session")

const SECRET_KEY = "SAMPLEAPI";

const SignUp = async (req,res) => {
    const {username,email,password} = req.body;
    // console.log("REGISTER: ",req.body)
    // return res.redirect("/register")
    try {
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"User Already Exists"})
            // return res.redirect('/blog')
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const result = await User.create({
            username:username,
            email:email,
            password:hashedPassword
        })

        const token = jwt.sign({email:result.email, id:result._id},SECRET_KEY)
        return res.status(201).json({user:result, token:token})
        // return res.redirect("/")


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong"})
    }
}

const SignIn = async (req,res) => {
    const {email,password} = req.body;
    // console.log("LOGIN: ",req.body)
    // return res.redirect("/login")
    try {
        const existingUser = await User.findOne({email: email})
        if(!existingUser){
            return res.status(404).json({message:"User Not Found"})
            // return res.redirect('/login')
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(404).json({message:"Invalid Credentials"})
            // return res.redirect('/login')
        }

        // const token = jwt.sign({email:existingUser.email, id:existingUser._id},SECRET_KEY)
        req.session.authencated = true;
        req.session.user = existingUser;
        return res.status(201).json({user:existingUser})
        // return res.redirect('/blog')

    } catch (error) {
        console.log(error)
        return res.status(501).json({message:"Something went wrong"})
    }
}

module.exports = {SignIn, SignUp};