require('dotenv').config(); // Load environment variables from .env file
const express = require("express")
const app = express();
const cors = require("cors");
require("./connection/connection")
const auth = require("./routes/auth")
const list = require("./routes/list")
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "https://mern-todo-project-bna7.onrender.com/"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
        return res.status(200).send("Preflight Passed");
    }

    console.log("Incoming request from:", req.headers.origin);
    next();
});




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
