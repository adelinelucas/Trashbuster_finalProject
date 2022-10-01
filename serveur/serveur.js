import express from "express";
import dotenv from 'dotenv';
import { connectBD } from "./config/connect.js";
import cors from 'cors';
import userRouter from './routes/userRouter.js'

// ==========
// App initialization
// ==========
dotenv.config({path:'./config/.env'})
const {MONGO_URI, APP_PORT,APP_LOCALHOST, ORIGIN } = process.env;

const app = express();
app.use(express.json());

// ==========
// Cors
// ==========
app.use(cors({
    origin:ORIGIN
}))

// ==========
// Routes
// ==========
app.use('/auth', userRouter)

// ==========
// Start app
// ==========
const start = async() => {
    try{
        await connectBD(MONGO_URI);
        app.listen(APP_PORT, ()=>{
            console.log(`App listen at http://${APP_LOCALHOST}:${APP_PORT}`)
        })

    }catch(err){
        console.log(err)
    }
}

start(); 