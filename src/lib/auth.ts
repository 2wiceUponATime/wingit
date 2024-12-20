import { jwtVerify } from "jose";
import { User } from "./types";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

export async function verifyToken(token: string) {
    const result = (await jwtVerify(token, JWT_SECRET)).payload;
    // console.log(JSON.stringify(result));
    return result as unknown as User;
}