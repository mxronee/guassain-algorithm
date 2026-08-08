import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app.js";

describe("POST /api/gaussian", () => {

    it("returns 200 and the correct solution for a valid matrix", async () => {
        const response = await request(app)
            .post("/api/gaussian")
            .send({
                matrix: [
                    [2, 1, 5],
                    [1, -1, 1]
                ]
            });

        expect(response.status).toBe(200);
        expect(response.body.solution.type).toBe("unique");
        expect(response.body.solution.values[0]).toBeCloseTo(2);
        expect(response.body.solution.values[1]).toBeCloseTo(1);
    });

    it("returns 200 and includes the elimination steps", async () => {
        const response = await request(app)
            .post("/api/gaussian")
            .send({
                matrix: [
                    [2, 1, 5],
                    [1, -1, 1]
                ]
            });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.steps)).toBe(true);
        expect(response.body.steps.length).toBeGreaterThan(0);
    });

    it("returns 400 when matrix is missing from the request body", async () => {
        const response = await request(app).post("/api/gaussian").send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it("returns 400 when matrix is not an array", async () => {
        const response = await request(app)
            .post("/api/gaussian")
            .send({ matrix: "not-an-array" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it("returns 400 when matrix is an empty array", async () => {
        const response = await request(app)
            .post("/api/gaussian")
            .send({ matrix: [] });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it("returns 200 with type no-solution for an inconsistent system", async () => {
        const response = await request(app)
            .post("/api/gaussian")
            .send({
                matrix: [
                    [1, 1, 1],
                    [1, 1, 2]
                ]
            });

        expect(response.status).toBe(200);
        expect(response.body.solution.type).toBe("no-solution");
    });

    it("GET / responds with a running-status message", async () => {
        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    });
});