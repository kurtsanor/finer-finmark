import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Authentication", () => {
  it.skip("should reject invalid credentials", async () => {
    const response = await request(app).post("/api/auth/sign-in").send({
      email: "wrong@email.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(400);
  });
});