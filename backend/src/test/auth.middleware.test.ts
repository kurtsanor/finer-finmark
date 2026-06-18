import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

describe("Auth middleware", () => {
  it("should reject protected routes without a token", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});