import { describe, expect, it } from "vitest";
import { createOrderSchema } from "../features/order/order.schema.js";

const baseAddress = {
  fullName: "Juan dela Cruz",
  address: "123 Rizal St, Barangay 1",
  city: "Manila",
  country: "PH",
  postalCode: "1000",
  phoneNumber: "09171234567",
};

const parse = (overrides: Partial<typeof baseAddress> = {}) =>
  createOrderSchema.safeParse({
    shippingAddress: { ...baseAddress, ...overrides },
  });

describe("createOrderSchema", () => {
  it("accepts a valid Philippines address (local phone format)", () => {
    expect(parse().success).toBe(true);
  });

  it("accepts a valid international phone format", () => {
    expect(parse({ phoneNumber: "+639171234567" }).success).toBe(true);
  });

  it("accepts a valid Indonesia address", () => {
    expect(
      parse({
        country: "ID",
        postalCode: "40115",
        phoneNumber: "081234567890",
      }).success,
    ).toBe(true);
  });

  it("accepts a valid Brunei address with an alphanumeric postal code", () => {
    expect(
      parse({
        country: "BN",
        postalCode: "BA1712",
        phoneNumber: "+6732345678",
      }).success,
    ).toBe(true);
  });

  it("rejects a full name containing digits", () => {
    expect(parse({ fullName: "Juan123" }).success).toBe(false);
  });

  it("rejects a full name that is too short", () => {
    expect(parse({ fullName: "J" }).success).toBe(false);
  });

  it("rejects a purely numeric address", () => {
    expect(parse({ address: "123456789" }).success).toBe(false);
  });

  it("rejects an address that is too short", () => {
    expect(parse({ address: "St." }).success).toBe(false);
  });

  it("rejects a city containing digits", () => {
    expect(parse({ city: "Manila2" }).success).toBe(false);
  });

  it("rejects a postal code with the wrong length for the selected country", () => {
    expect(parse({ postalCode: "123" }).success).toBe(false);
  });

  it("rejects a postal code that is a valid length for a different country", () => {
    // 5 digits is valid for Indonesia, but PH expects exactly 4.
    expect(parse({ postalCode: "12345" }).success).toBe(false);
  });

  it("rejects a phone number with too few digits", () => {
    expect(parse({ phoneNumber: "0912345" }).success).toBe(false);
  });

  it("rejects a phone number using a different country's dial code", () => {
    expect(parse({ phoneNumber: "+6281234567890" }).success).toBe(false);
  });

  it("rejects an unsupported country code", () => {
    expect(parse({ country: "US" }).success).toBe(false);
  });

  it("rejects a missing country", () => {
    const result = createOrderSchema.safeParse({
      shippingAddress: {
        fullName: baseAddress.fullName,
        address: baseAddress.address,
        city: baseAddress.city,
        postalCode: baseAddress.postalCode,
        phoneNumber: baseAddress.phoneNumber,
      },
    });
    expect(result.success).toBe(false);
  });
});