import express from "express";
import bookingRouter from "@routes/bookingRouter";
import cors from "cors";
import dotenv from "dotenv";
import modelsRouter from "@routes/modelsRouter";
import userRouter from "@routes/userRouter";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT: number = Number.parseInt(process.env.PORT || "3000");

// Add JSON body parsing middleware
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: 'API Working' });
});

// Add the API routes before Vite's middleware
app.use('/api/booking', bookingRouter);
app.use('/api/models', modelsRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});