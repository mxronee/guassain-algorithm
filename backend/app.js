import express from "express";
import cors from "cors";
import gaussianRoute from "./route/guassianRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

// Route
app.use("/api/gaussian", gaussianRoute);

app.get("/", (req, res) => {
    res.json({
        message: "Gaussian Algorithm API is running"
    });
});

export default app;