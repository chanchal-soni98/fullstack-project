import express from 'express';
import connectDB from './Config/server.js';
import userRoutes from './Router/userRoutes.js';
import ShipRoutes from './Router/ShipRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use('/', userRoutes);
app.use('/', ShipRoutes);
connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
