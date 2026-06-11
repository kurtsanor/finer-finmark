export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type JwtClaims = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};
