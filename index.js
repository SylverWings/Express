const express = require("express");
const db = require("./config/database");
const User = require("./models/User");
const userRoutes = require('./routes/user.routes')
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;

//routes
app.use('/api', userRoutes);

app.get("/", (req, res)=>{
    return res.send("Bienvenidos a mi aplicacion de tareas")
});

app.get("*", (req, res)=>{
    return res.status(404).send("404 route not found")
});

db()
    .then (()=> {
        app.listen(port, ()=> {
            console.log("server is running: " + port)
        });

    })
    .catch((error) => {
        console.log("Error conecting mongoDB " + error)
    });
    