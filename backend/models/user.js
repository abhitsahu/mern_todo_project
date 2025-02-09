const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    email:{

        type: String,
        unique: [true,"Email already exist"],
        require:[true,"Please enter your email"],
    },

    username:{

        type: String,
        dunique: true,
        required: true,

    },

    password:{

        type: String,
        required: [true,"Enter the password"],

    },

    list:[
        {

            type: mongoose.Types.ObjectId,
            ref: "List",

        },
    ],

});

module.exports = mongoose.model("User",userSchema);