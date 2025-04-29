import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import jwt from "jsonwebtoken"

import { connectDB } from "./config/db.js";
import { isAtLeastTenYearsOld, hashPassword } from "./utils.js";
import User from "./models/user.model.js";

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json()); 


const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Good game');
});




app.post('/register', async (req, res) => {
    // get user data from the request
    const { userName, birthday, gender, email, password } = req.body;

    // check if all the fields are not null
    if (!userName || !birthday || !gender || !email || !password) {
        return res.status(400).json({ success: false, data: [], message: 'All fields are required.' });
    }

    if (!birthday.day || !birthday.month || !birthday.year) {
        return res.status(400).json({ success: false, data: [], message: 'Birthday must include day, month, and year.' });
    }

    // the user must be at least 10 years old
    if (!isAtLeastTenYearsOld(birthday)) {
        return res.status(400).json({ success: false, data: [], message: 'You must be at least 10 years old to register.' });
    }

    try {
        // find the user in db by email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, data: [],  message: 'User already exists.' });
        }


        const hashedPassword = await hashPassword(password);
  

        const newUser = new User({
            userName,
            birthday,
            gender,
            email,
            password: hashedPassword,  
        });

        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully!' });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
});
  
  // Login route
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Here you would normally check user credentials from a database
    console.log('User trying to login with:', { email, password });
  
    // Example success response
    res.status(200).json({ message: 'Login successful!' });
  });


  

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${PORT}`);
});