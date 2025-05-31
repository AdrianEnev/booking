"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingRouter_1 = __importDefault(require("@routes/bookingRouter"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const modelsRouter_1 = __importDefault(require("@routes/modelsRouter"));
const userRouter_1 = __importDefault(require("@routes/userRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const PORT = Number.parseInt(process.env.PORT || "3000");
// Add JSON body parsing middleware
app.use(express_1.default.json());
app.get('/api', (req, res) => {
    res.json({ message: 'API Working' });
});
// Add the API routes before Vite's middleware
app.use('/api/booking', bookingRouter_1.default);
app.use('/api/models', modelsRouter_1.default);
app.use('/api/user', userRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
