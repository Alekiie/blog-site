import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) =>{
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-passsword");
            if(!req.user) {
                return res.status(401).json({message :"User not found"});
            }
            next()
        } catch (error) {
            return res.status(401).json({message:"Invalid or expired token"});
        }
    }
    if (!token){
        return res.status(401).json({message:"No token, Authorization denied"});
    }
};