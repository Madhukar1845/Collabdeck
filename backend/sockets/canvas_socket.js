import Event from "../models/Event.js"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import {parseCookie} from 'cookie';
import User from '../models/User.js'
dotenv.config();
const init_canvasSocket=(io)=>{
    const roomUsers={};
    io.on('connection',async (socket)=>{
        console.log('A user connected:',socket.id);
        try{
            const cookies=parseCookie(socket.handshake.headers.cookie||'');
            const token=cookies.token;
            const valid=jwt.verify(token,process.env.JWT_SECRET);
            socket.userId=valid.id;
            const user=await User.findById(valid.id);
            socket.userName=user.name;
        }catch(err){
            socket.disconnect();
            return;
        }
        socket.on('room:join',async({roomId})=>{
            socket.join(roomId);
            if (!roomUsers[roomId]) roomUsers[roomId]=[];
            roomUsers[roomId].push({socketId:socket.id,userId:socket.userId,userName:socket.userName});
            io.to(roomId).emit('room:users',roomUsers[roomId]);
            const events=await Event.find({roomId}).sort({sequence:1});
            socket.emit('room:history',events);
        })
        socket.on('canvas:event',async({roomId,type,payload})=>{
            try{
                const lastEvent=await Event.findOne({roomId}).sort({sequence:-1});
                const nextSequence=lastEvent?lastEvent.sequence+1:1;
                const newEvent=await Event.create({roomId,type,payload,'userId':socket.userId,'sequence':nextSequence});
                io.to(roomId).emit('canvas:newEvent',newEvent);
            }catch(err){
                console.error(err);
            }
        })  
        socket.on('cursor:move',({roomId,x,y})=>{
            socket.broadcast.to(roomId).emit('cursor:move',{userId:socket.userId,x,y});
        })
        socket.on('disconnect',()=>{
            console.log('A User disconnected:',socket.userId);
            for (const roomId in roomUsers){
                roomUsers[roomId]=roomUsers[roomId].filter(u=>u.socketId!==socket.id);
                io.to(roomId).emit('room:users',roomUsers[roomId]);
            }
        })     
    })
}
export default init_canvasSocket;