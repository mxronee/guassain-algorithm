import express from "express";
import cors from "cors";
import gaussianRoute from "./route/guassianRoute.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Route
app.use("/api/gaussian", gaussianRoute);

app.get("/", (req, res) => {
    res.json({
        message: "Gaussian Algorithm API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});