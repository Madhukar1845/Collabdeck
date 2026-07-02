import generateCode from "../utils/generateRoomCode.js";
import Room from "../models/Room.js";
export const createRoom=async(req,res)=>{
    try{
    let roomCode=generateCode();
    let existing=await Room.findOne({roomId:roomCode});
        while (existing){
            roomCode=generateCode();
            existing=await Room.findOne({roomId:roomCode})
        }
    const room=await Room.create({roomId:roomCode,ownerId:req.user.id})
    res.status(201).json({room})
    }catch(err){
        res.status(500).json({text:"Something went wrong"})
    }
}

export const getRoom=async(req,res)=>{
    try{
        const roomId=req.params.roomId;
        const existing=await Room.findOne({roomId:roomId});
        if (!existing){
            return res.status(404).json({text:'Room Not Found'});
        }
        res.status(200).json(existing);
    }catch(err){
        res.status(500).json({text:"something went wrong"})
    }
}