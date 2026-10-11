import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.route.js"
const app=express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then( () =>{
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})

//middleware to handle cors
app.use(express.json());
app.use(cors({
    origin:process.env.FRONT_END_URL || "http://localhost:5173",
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:["Content-Type", "Authorization"],
}))

app.use("/api/auth", authRoutes);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
}) 
