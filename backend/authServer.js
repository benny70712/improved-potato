import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import jwt from "jsonwebtoken"


import { connectDB } from "./config/db.js";
import { isAtLeastTenYearsOld, hashPassword, checkPassword} from "./utils.js";
import User from "./models/user.model.js";
import RefreshToken from "./models/refreshToken.model.js";

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json()); 


const AUTH_PORT = process.env.AUTH_PORT;


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
            return res.status(400).json({ success: false, data: [],  message: ']Account already exists.' });
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
    
        res.status(201).json({ message: 'Registeration successful' });
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


        const payload = {id: user._id, email: user.email};

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        const refreshTokenModel = new RefreshToken({
            userId: user._id,
            token: refreshToken,
        });

        await refreshTokenModel.save()


        return res.status(200).json({ success: true, data: [], tokens: {accessToken, refreshToken}, message: 'Login successful!' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.post('/refresh', async (req, res) => {
    const refreshToken = req.body.token;


    if (!refreshToken) return res.sendStatus(401);

    const existingToken = await RefreshToken.findOne({ token: refreshToken });

    if (!existingToken) {
        return res.sendStatus(403);
    }

    try {
        const jwtPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const payload = {id: jwtPayload.id, email: jwtPayload.email}
        const accessToken = generateAccessToken(payload);
        return res.status(200).json({ success: true, data: [], tokens: {accessToken}, message: 'New access token' });

    } catch (error) {
        return res.sendStatus(403);
    }

});


app.post('/logout', async (req, res) => {
    const tokenFromClient = req.body.token;
    try {
        const { deletedCount } = await RefreshToken.deleteOne({ token: tokenFromClient });
    
        if (deletedCount === 0) {
            return res.status(400).json({ success: false, data: [], tokens: {}, message: 'There is no refresh token' });
        }
        return res.status(200).json({ success: true, data: [], tokens: {}, message: 'Refresh token deleted successfully.' });
    } catch (error) {
        return res.status(400).json({ success: false, data: [], tokens: {}, message: 'Error in deleting refresh token.' }); 
    }

    

    
})


function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
}



app.listen(AUTH_PORT, () => {
    connectDB()
    console.log(`Auth Server is running on http://localhost:${AUTH_PORT}`);
});