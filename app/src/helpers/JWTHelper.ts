import jwt from "jsonwebtoken";

export class JWTHelper {
  static decodeToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET ?? "");
  }
}
