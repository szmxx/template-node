/*
 * @Author: cola
 * @Date: 2022-10-19 14:50:48
 * @LastEditors: cola
 * @Description:
 */
import jwt from "jsonwebtoken";
export function getJWTToken(payload = {}, expires = 60 * 60) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: expires,
    });
}
export function verifyJWTToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, {
        complete: true,
    });
}
export function decodeJwt(token) {
    return jwt.decode(token, { complete: true });
}
