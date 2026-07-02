import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken=(userId)=>{
    const token=jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
    return token;
}

export default generateToken;