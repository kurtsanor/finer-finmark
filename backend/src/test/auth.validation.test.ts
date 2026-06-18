import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

describe("Auth validation", () => {
  it("should reject invalid sign-up data", async () => {
    const response = await request(app).post("/api/auth/sign-up").send({
      firstName: "",
      lastName: "Test",
      email: "invalid-email",
      password: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation failed");
  });
});