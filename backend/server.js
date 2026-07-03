import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import roomRoutes from "./routes/roomRoutes.js";
import init_canvasSocket from "./sockets/canvas_socket.js";
dotenv.config();
const app=express();
app.use(express.json());
app.use(cors({origin:['http://localhost:5173','https://collabdeck-kappa.vercel.app'],credentials:true}));
app.use(cookieParser());
await connectDb();
app.use('/auth',authRoutes);
app.use('/rooms',roomRoutes);

app.get('/',(req,res)=>{
    res.send('Server is Running');
})
const server=http.createServer(app);
const io=new Server(server,{cors:{origin:["http://localhost:5173",'https://collabdeck-kappa.vercel.app'],credentials:true}});
init_canvasSocket(io);
server.listen(process.env.PORT || 5000,()=>{
    console.log('Server is Running on PORT 5000');
})

