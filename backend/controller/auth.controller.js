import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

const signup=async(req, res, next) => {
    const{name, email, password, profileImageUrl, adminJoinCode} = req.body;
    if(!name || !email || !password || name===""||email===""||password===""){
        return next(errorHandler(400, "All fields are required"))  
    }
    const isAlreadyExists = await User.findOne({email});
    if(isAlreadyExists){
        return next(errorHandler(400, "User already exists"));
    }
    let role = "user";
    if(adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE){
        role = "admin";
    }
    const hashedPassword = await bcryptjs.hashSync(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profileImageUrl,
        role,
    })
    try{
        await newUser.save();
        res.json("Signup successful");

    }
    catch(error){
        return next(errorHandler(500, error.message));
    }
}
export default signup;