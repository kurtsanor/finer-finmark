export type JwtClaims = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};
