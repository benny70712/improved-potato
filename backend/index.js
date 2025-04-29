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
app.post('/login', async  (req, res) => {
    const { email, password } = req.body;

    // 1. Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    try {
        // 2. Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }


        // 3. Compare password
        const isPasswordValid = await checkPassword(password, user.password);


        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }


        const accessToken = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            process.env.ACCESS_TOKEN_SECRET,                          // Secret
            { expiresIn: '1h' }                  // Token expiration
        );

        

        // 4. Successful login
        res.status(200).json({ success: true, data: [accessToken], message: 'Login successful!' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);


    try {
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user
        next()
        return

    }catch (err) {
        return res.sendStatus(403);
    }



}

app.get("/posts", authenticateToken ,async (req, res) => {
    console.log(req.user)
    res.status(200).json({ success: false, message: 'This is st routes' });
})


  

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${PORT}`);
});