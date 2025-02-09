const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({

    title:{
        type: String,
        required: [true,"enter the title..."],
    },

    body:{

        type: String,
        required:[true,"enter details..."],
    },

    user:[
        {

            type: mongoose.Types.ObjectId,
            ref: "User",

        },
    ],
    
},
{ timestamps: true}
);

module.exports = mongoose.model("List",listSchema);