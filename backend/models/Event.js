import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
    roomId:{type:String,required:true},
    type:{type:String,required:true},
    payload:{type:mongoose.Schema.Types.Mixed,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    sequence:{type:Number,required:true},
},{timestamps:true});

export default mongoose.model('Event',eventSchema);