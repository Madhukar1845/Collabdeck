import mongoose from "mongoose";

const roomSchema=new mongoose.Schema({
    roomId:{type:String,unique:true,minlength:6,maxlength:6,required:true},
    ownerId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},{timestamps:true});

export default mongoose.model('Room',roomSchema);