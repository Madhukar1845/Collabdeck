import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';
export const signup=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        if (!name || !email || !password){
            return res.status(400).json({text:'name,email and password are required'})
        }
        const existing=await User.findOne({email});
        if (existing){
            return res.status(409).json({text:'Email already registered'})
        }
        const salt=await bcrypt.genSalt(10);
        const passwordHash=await bcrypt.hash(password,salt);
        const user=await User.create({name,email,passwordHash});
        const token=generateToken(user._id);
        res.cookie('token',token,{
            httpOnly:true,
            maxAge:24*7*60*60*1000
        }
        )
        res.status(201).json({name,email});

    }catch(err){
        res.status(500).json({text:"Something went wrong"});
    }
}
export const login=async (req,res)=>{
    try{
    const {email,password}=req.body;
    if (!email || !password){
        return res.status(400).json({text:'Email and password are required'});
    }
    const existing=await User.findOne({email});
    if (!existing){
        return res.status(401).json({text:'Incorrect Email or password'});
    }
    const rightpass=await bcrypt.compare(password,existing.passwordHash);
    if (!rightpass){
        return res.status(401).json({text:'Incorrect Email or password'});
    }
    const token=generateToken(existing._id);
    res.cookie('token',token,{
        httpOnly:true,
        maxAge:24*7*60*60*1000}
    )
    res.status(200).json({ text: 'Login successful' });
    }catch(err){
        res.status(500).json({text:'Something went wrong'})
    }
}