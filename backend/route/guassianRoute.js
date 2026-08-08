import express from "express";
import { calculateGaussian } from "../controller/guassianController.js";

const router = express.Router();

router.post("/", calculateGaussian);

export default router;