import jwt from "jsonwebtoken";

export function getJWTToken(payload = {}, expires = 7 * 24 * 60 * 60) {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: expires,
  });
}

export function verifyJWTToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!, {
    complete: true,
  });
}

export function decodeJwt(token: string) {
  return jwt.decode(token, { complete: true });
}
