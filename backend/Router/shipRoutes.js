import express from "express";
import { getShips } from "../Controller/marineController.js";

const router = express.Router();

router.get("/getShip",  getShips);

export default router;