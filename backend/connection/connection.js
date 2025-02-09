const mongoose = require('mongoose');

// Use the DB_URI from .env
const dbURI = process.env.DB_URI; // Update with your credentials and database name

const connect = async (req,res) => {
    try {
        await mongoose.connect(dbURI)
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log(err));
        
    } catch (error) {
        res.status(400).json({
            message:"not connected",
        });
    }
};

connect();

