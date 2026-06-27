import { z } from "zod";
import {
  COUNTRY_CODES,
  getCountryConfig,
  isValidPhoneForCountry,
  isValidPostalCodeForCountry,
} from "../../constants/seaCountries.js";

// Letters (any script/diacritic) + spaces + hyphen + apostrophe only.
const FULL_NAME_REGEX = /^[\p{L}\p{M}\s'-]+$/u;
// Letters + numbers + spaces + comma/period/hyphen.
const ADDRESS_REGEX = /^[\p{L}\p{N}\s,.-]+$/u;
// Letters + spaces only.
const CITY_REGEX = /^[\p{L}\s]+$/u;
const POSTAL_CODE_FORMAT_REGEX = /^[A-Za-z0-9]+$/;
const PHONE_FORMAT_REGEX = /^\+?[0-9\s-]+$/;

export const createOrderSchema = z.object({
  shippingAddress: z
    .object({
      fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must not exceed 100 characters")
        .regex(
          FULL_NAME_REGEX,
          "Full name can only contain letters, spaces, hyphens, and apostrophes",
        ),

      address: z
        .string()
        .trim()
        .min(5, "Address must be at least 5 characters")
        .max(150, "Address must not exceed 150 characters")
        .regex(
          ADDRESS_REGEX,
          "Address can only contain letters, numbers, commas, periods, and hyphens",
        )
        .refine(
          (value) => /\p{L}/u.test(value),
          "Address cannot be purely numeric",
        ),

      city: z
        .string()
        .trim()
        .min(2, "City must be at least 2 characters")
        .max(100, "City must not exceed 100 characters")
        .regex(CITY_REGEX, "City can only contain letters and spaces"),

      country: z.enum(COUNTRY_CODES, "Please select a country"),

      postalCode: z
        .string()
        .trim()
        .min(1, "Postal code is required")
        .regex(
          POSTAL_CODE_FORMAT_REGEX,
          "Postal code can only contain letters and numbers",
        ),

      phoneNumber: z
        .string()
        .trim()
        .min(1, "Phone number is required")
        .regex(
          PHONE_FORMAT_REGEX,
          "Phone number can only contain numbers, spaces, hyphens, and an optional leading +",
        ),
    })
    .superRefine((data, ctx) => {
      const country = getCountryConfig(data.country);
      if (!country) return;

      if (!isValidPostalCodeForCountry(data.postalCode, country)) {
        ctx.addIssue({
          code: "custom",
          path: ["postalCode"],
          message:
            country.postalCodeType === "alphanumeric"
              ? `${country.name} postal codes must be ${country.postalCodeLength} alphanumeric characters (e.g. ${country.postalCodeExample})`
              : `${country.name} postal codes must be exactly ${country.postalCodeLength} digits (e.g. ${country.postalCodeExample})`,
        });
      }

      if (!isValidPhoneForCountry(data.phoneNumber, country)) {
        ctx.addIssue({
          code: "custom",
          path: ["phoneNumber"],
          message: `Enter a valid ${country.name} phone number, e.g. local 0XXXXXXXXX or international ${country.dialCode}XXXXXXXXX`,
        });
      }
    }),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["placed", "confirmed", "shipped", "delivered"]),
});
