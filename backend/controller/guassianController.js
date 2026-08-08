import { gaussianElimination } from "../algorithm/guassian.js";

export function calculateGaussian(req, res) {
    try {
        const { matrix } = req.body;

        if (!matrix) {
            return res.status(400).json({
                error: "Matrix is required"
            });
        }

        if (!Array.isArray(matrix)) {
            return res.status(400).json({
                error: "Matrix must be an array"
            });
        }

        if (matrix.length === 0) {
            return res.status(400).json({
                error: "Matrix cannot be empty"
            });
        }

        const result = gaussianElimination(matrix);

        return res.status(200).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}