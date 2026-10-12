import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
const app=express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then( () =>{
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})

//middleware to handle cors
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONT_END_URL || "http://localhost:5173",
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:["Content-Type", "Authorization"],
}))

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}) 
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
        
    })
})

