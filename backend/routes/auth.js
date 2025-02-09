const express = require('express');
const router = express.Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs");

// Define your routes here
//signup
router.post("/register", async (req, res) => {
    try {
        console.log("Received Register Request:", req.body); // Log the incoming request body

        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Missing fields" }); // Check for missing fields
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists"); // Log if user already exists
            return res.status(400).json({ message: "User already exists" });
        }

        const hashpassword = bcrypt.hashSync(password, 10); // Hash the password
        const user = new User({ email, username, password: hashpassword });

        await user.save();
        console.log("User saved successfully"); // Log successful user save

        res.status(201).json({ message: "Sign up successful" });
    } catch (error) {
        console.error("Error in register route:", error); // Log any errors
        res.status(500).json({ message: "Internal server error" });
    }
});


//login
router.post('/login', async (req, res) => {
    // Handle login

    try {

        const user = await User.findOne({email: req.body.email});
        const isPasswordCorrect = bcrypt.compareSync( req.body.password,user.password);

        if(!user){

            res.status(200).json({
                message:"user don't exists"
            });

        }
        if(!isPasswordCorrect){

            res.status(200).json({
                message:"incorrect password"
            });

        }
        
        //after login show the user details
        const {password,...others} = user._doc; //password chor k sara data de dega
        res.status(200).json({others});


    } catch (error) {
        res.status(200).json({
            message:"user don't exists"
        });
        
    }
});


module.exports = router;
