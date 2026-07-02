import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authenticate=(req,res,next)=>{
    const cookies_token=req.cookies.token;
    if(!cookies_token){
        return res.status(401).json({text:"Not authenticated"});
    }
    try{
    const valid= jwt.verify(cookies_token,process.env.JWT_SECRET);
    req.user=valid;
    next();

}catch(err){
    res.status(401).json({text:'Not authenticated'});
}
};
export default authenticate;