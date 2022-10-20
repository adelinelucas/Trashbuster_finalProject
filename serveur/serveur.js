import express from "express";
import dotenv from 'dotenv';
import { connectBD } from "./config/connect.js";
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import postRouter from'./routes/postRouter.js';
import commentRouter from './routes/commentRouter.js';

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
    origin:ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH","HEAD","DELETE","OPTIONS" ]//"GET,HEAD,PUT,PATCH,POST,DELETE",
}))

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", ORIGIN); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
// ==========
// Routes
// ==========
app.use('/auth', userRouter)
app.use('/cleaning-operation', postRouter)
app.use('/comments', commentRouter)

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