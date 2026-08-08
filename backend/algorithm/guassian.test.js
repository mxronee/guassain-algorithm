import { describe, it, expect } from "vitest";
import { gaussianElimination } from "./guassian.js";

describe("gaussianElimination", () => {

    describe("unique solution", () => {

        it("solves a simple 2x2 system", () => {
            const result = gaussianElimination([
                [2, 1, 5],
                [1, -1, 1]
            ]);
            expect(result.solution.type).toBe("unique");
            expect(result.solution.values[0]).toBeCloseTo(2);
            expect(result.solution.values[1]).toBeCloseTo(1);
        });

        it("solves a standard 3x3 system", () => {
            const result = gaussianElimination([
                [1, 1, 1, 6],
                [0, 2, 5, -4],
                [2, 5, -1, 27]
            ]);
            expect(result.solution.type).toBe("unique");
            expect(result.solution.values[0]).toBeCloseTo(5);
            expect(result.solution.values[1]).toBeCloseTo(3);
            expect(result.solution.values[2]).toBeCloseTo(-2);
        });

        it("solves a single-variable equation", () => {
            const result = gaussianElimination([[2, 10]]);
            expect(result.solution.type).toBe("unique");
            expect(result.solution.values[0]).toBeCloseTo(5);
        });

        it("accepts numeric strings and converts them", () => {
            const result = gaussianElimination([
                ["2", "1", "5"],
                ["1", "-1", "1"]
            ]);
            expect(result.solution.type).toBe("unique");
            expect(result.solution.values[0]).toBeCloseTo(2);
            expect(result.solution.values[1]).toBeCloseTo(1);
        });
    });

    describe("row pivoting", () => {

        it("swaps rows when the first pivot candidate is zero", () => {
            const result = gaussianElimination([
                [0, 1, 3],
                [1, 1, 5]
            ]);
            expect(result.solution.type).toBe("unique");
            expect(result.solution.values[0]).toBeCloseTo(2);
            expect(result.solution.values[1]).toBeCloseTo(3);
            const hasSwapStep = result.steps.some(
                step => step.operation.includes("↔")
            );
            expect(hasSwapStep).toBe(true);
        });

        it("chooses the largest-magnitude row as pivot (partial pivoting)", () => {
            const result = gaussianElimination([
                [1, 1, 3],
                [4, -1, 2]
            ]);
            expect(result.matrix[0][0]).toBe(4);
        });
    });

    describe("no solution", () => {

        it("detects an inconsistent (parallel) system", () => {
            const result = gaussianElimination([
                [1, 1, 1],
                [1, 1, 2]
            ]);
            expect(result.solution.type).toBe("no-solution");
        });
    });

    describe("dependent system (documents current behavior)", () => {

        it("defaults free variables to 0 instead of flagging infinite solutions", () => {
            const result = gaussianElimination([
                [1, 1, 3],
                [2, 2, 6]
            ]);
            expect(result.solution.type).toBe("unique");
            expect(result.solution.values[1]).toBe(0);
            expect(result.solution.values[0]).toBeCloseTo(3);
        });
    });

    describe("output shape", () => {

        it("returns matrix, steps and solution", () => {
            const result = gaussianElimination([
                [2, 1, 5],
                [1, -1, 1]
            ]);
            expect(result).toHaveProperty("matrix");
            expect(result).toHaveProperty("steps");
            expect(result).toHaveProperty("solution");
            expect(Array.isArray(result.steps)).toBe(true);
        });

        it("records at least one step for a system requiring elimination", () => {
            const result = gaussianElimination([
                [2, 1, 5],
                [1, -1, 1]
            ]);
            expect(result.steps.length).toBeGreaterThan(0);
        });

        it("cleans up near-zero floating point noise to exactly 0", () => {
            const result = gaussianElimination([
                [3, 1, 9],
                [1, 2, 8]
            ]);
            const hasDirtyZero = result.matrix.some(
                row => row.some(value => value !== 0 && Math.abs(value) < 1e-10)
            );
            expect(hasDirtyZero).toBe(false);
        });
    });
});