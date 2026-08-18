const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
    test("should return API running message", async () => {
        const response = await request(app)
            .get("/");
        
        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({
            message: "Task Manager API is running."
        });
    });
});