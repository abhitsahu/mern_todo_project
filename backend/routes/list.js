const express = require('express');
const router = express.Router();
const User = require("../models/user")
const List = require("../models/list")


//create
router.post("/addTask", async (req,res) =>{

    try {

        const {title,body,id} = req.body;
        const existingUser = await User.findById(id); //to see if the user has login or not

        if(existingUser){

            const list = new List({ title, body, user: existingUser});
            await list.save().then(() => res.status(200).json({ list }));
            existingUser.list.push(list);
            existingUser.save();

        }

    } catch (error) {
        console.log(error);
        
    }


});

//update

router.put("/updateTask/:id", async (req,res) =>{

    try {

        const {title , body } = req.body;

        // const {title,body,email} = req.body;
        // const existingUser = await User.findOne({ email }); //to see if the user has login or not

        // if(existingUser){

            const list = await List.findByIdAndUpdate(req.params.id, {title,body});
            list.save().then(()=> res.status(200).json({message: "Task updated"}));

        // }

    } catch (error) {
        console.log(error);
        
    }


});

//delete

router.delete("/deleteTask/:id", async (req,res) =>{

    try {

        const {id} = req.body;
        // console.log("Searching for user with email:", email);
        const existingUser = await User.findByIdAndUpdate(id,{$pull:{list: req.params.id}});

        if(existingUser){

            const deletedTask = await List.findByIdAndDelete(req.params.id);
            if (deletedTask) {
                res.status(200).json({message: "Task deleted"});
            } else {
                res.status(404).json({message: "Task not found"});
            }

        } else {
            res.status(404).json({message: "User not found"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"}); // Send a response on error
    }


});


//get task

router.get("/getTasks/:id", async (req,res)=>{

     const list = await List.find({ user: req.params.id}).sort({createdAt: -1});

     if(list.length!==0){
        res.status(200).json({list});
     }
     else{
        res.status(200).json({message:"no task created"});
     }
});




module.exports = router;  
