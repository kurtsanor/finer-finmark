export type CountryCode =
  | "PH"
  | "ID"
  | "MY"
  | "SG"
  | "TH"
  | "VN"
  | "BN"
  | "KH"
  | "LA"
  | "MM"
  | "TL";

export type PostalCodeType = "numeric" | "alphanumeric";

export type CountryConfig = {
  code: CountryCode;
  name: string;
  dialCode: string;
  postalCodeLength: number;
  postalCodeType: PostalCodeType;
  postalCodeExample: string;
};

export const SEA_COUNTRIES: CountryConfig[] = [
  {
    code: "PH",
    name: "Philippines",
    dialCode: "+63",
    postalCodeLength: 4,
    postalCodeType: "numeric",
    postalCodeExample: "8000",
  },
  {
    code: "ID",
    name: "Indonesia",
    dialCode: "+62",
    postalCodeLength: 5,
    postalCodeType: "numeric",
    postalCodeExample: "40115",
  },
  {
    code: "MY",
    name: "Malaysia",
    dialCode: "+60",
    postalCodeLength: 5,
    postalCodeType: "numeric",
    postalCodeExample: "43000",
  },
  {
    code: "SG",
    name: "Singapore",
    dialCode: "+65",
    postalCodeLength: 6,
    postalCodeType: "numeric",
    postalCodeExample: "238801",
  },
  {
    code: "TH",
    name: "Thailand",
    dialCode: "+66",
    postalCodeLength: 5,
    postalCodeType: "numeric",
    postalCodeExample: "10110",
  },
  {
    code: "VN",
    name: "Vietnam",
    dialCode: "+84",
    postalCodeLength: 6,
    postalCodeType: "numeric",
    postalCodeExample: "700000",
  },
  {
    code: "BN",
    name: "Brunei",
    dialCode: "+673",
    postalCodeLength: 6,
    postalCodeType: "alphanumeric",
    postalCodeExample: "BA1712",
  },
  {
    code: "KH",
    name: "Cambodia",
    dialCode: "+855",
    postalCodeLength: 5,
    postalCodeType: "numeric",
    postalCodeExample: "12000",
  },
  {
    code: "LA",
    name: "Laos",
    dialCode: "+856",
    postalCodeLength: 5,
    postalCodeType: "numeric",
    postalCodeExample: "01000",
  },
  {
    code: "MM",
    name: "Myanmar",
    dialCode: "+95",
    postalCodeLength: 5,
    postalCodeType: "numeric",
    postalCodeExample: "11181",
  },
  {
    code: "TL",
    name: "Timor-Leste",
    dialCode: "+670",
    postalCodeLength: 5,
    postalCodeType: "numeric",
    postalCodeExample: "01000",
  },
];

const COUNTRY_MAP = new Map(SEA_COUNTRIES.map((country) => [country.code, country]));

export const COUNTRY_CODES = SEA_COUNTRIES.map((country) => country.code) as [
  CountryCode,
  ...CountryCode[],
];

export const getCountryConfig = (code: string): CountryConfig | undefined =>
  COUNTRY_MAP.get(code as CountryCode);

const NATIONAL_NUMBER_MIN_LENGTH = 7;
const NATIONAL_NUMBER_MAX_LENGTH = 11;

export const isValidPostalCodeForCountry = (
  postalCode: string,
  country: CountryConfig,
): boolean => {
  const pattern =
    country.postalCodeType === "alphanumeric"
      ? new RegExp(`^[A-Za-z0-9]{${country.postalCodeLength}}$`)
      : new RegExp(`^[0-9]{${country.postalCodeLength}}$`);

  return pattern.test(postalCode);
};

export const isValidPhoneForCountry = (
  phoneNumber: string,
  country: CountryConfig,
): boolean => {
  const cleaned = phoneNumber.replace(/[\s-]/g, "");

  let nationalNumber: string;

  if (cleaned.startsWith(country.dialCode)) {
    nationalNumber = cleaned.slice(country.dialCode.length);
  } else if (cleaned.startsWith("+")) {
    return false;
  } else if (cleaned.startsWith("0")) {
    nationalNumber = cleaned.slice(1);
  } else {
    nationalNumber = cleaned;
  }

  return (
    /^[0-9]+$/.test(nationalNumber) &&
    nationalNumber.length >= NATIONAL_NUMBER_MIN_LENGTH &&
    nationalNumber.length <= NATIONAL_NUMBER_MAX_LENGTH
  );
};

