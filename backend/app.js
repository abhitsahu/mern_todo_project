require('dotenv').config(); // Load environment variables from .env file
const express = require("express")
const app = express();
const cors = require("cors");
require("./connection/connection")
const auth = require("./routes/auth")
const list = require("./routes/list")
app.use(express.json());
app.use(cors({
    origin: "https://mern-todo-project-6dtb-frontend.vercel.app", // Update this to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // Allow credentials if needed
}));



app.get("/", (req,res) => {
    res.send("hello");
});


app.use("/api/v1", auth);
app.use("/api/v2", list);

// Use PORT from .env or default to 1000
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});