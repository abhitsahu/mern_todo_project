const express = require('express');
const router = express.Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs");

// Define your routes here
//signup
router.post("/register", async (req, res) => {
    // Handle registration

    try {

        const {email,username,password} = req.body;

        const hashpassword = bcrypt.hashSync(password);
        const user = new User({email,username,password: hashpassword});
        // await user.save().then(()=> res.status(200).json({user:user}));
        await user.save().then(()=> res.status(200).json({message: "sign up successfull"})); //frontent mein user ka data dikh rha tah uss k liye json ko change kiya

        
    } catch (error) {
        res.status(200).json({
            message:"user already exists"
        });
        
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
