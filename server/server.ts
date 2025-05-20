import express from "express";
import bookingRouter from "@routes/bookingRouter";
import cors from "cors";
import dotenv from "dotenv";

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});