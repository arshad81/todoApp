import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRouter from "./routes/taskRoutes.js";
import cors from "cors"

dotenv.config();
const app = express();

app.use(cors()); // Enable CORS for all routes


app.use(express.json());

app.use('/',taskRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected");
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
    }
}

connectDB();