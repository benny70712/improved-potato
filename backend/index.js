import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import jwt from "jsonwebtoken"


import { connectDB } from "./config/db.js";
import { isAtLeastTenYearsOld, hashPassword, checkPassword} from "./utils.js";
import User from "./models/user.model.js";

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json()); 


const PORT = process.env.PORT;



app.get("/posts", authenticateToken ,async (req, res) => {
    console.log(req.user)
    res.status(200).json({ success: false, message: 'This is st routes' });
})

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // No token


    try {
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user
        next()
        return

    }catch (err) {
        return res.sendStatus(403); // Invalid token
    }



}




  

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${PORT}`);
});