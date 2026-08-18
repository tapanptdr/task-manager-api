const request = require("supertest");
const app = require("../app");

describe("Authentication", () => {
    test("should reject request without token", async () => {

        const response = await request(app)
            .get("/api/v1/users/profile");
        
        expect(response.statusCode).toBe(401);

        expect(response.body.success).toBe(false);

        expect(response.body.message).toBe("No token provided");
    });

    test("should reject invalid token", async () => {
        const response = await request(app)
            .get("/api/v1/users/profile")
            .set(
                "Authorization",
                "Bearer invalid-token"
            );

        expect(response.statusCode).toBe(401);

        expect(response.body.success).toBe(false);

        expect(response.body.message).toBe("Invalid token");
    });
});