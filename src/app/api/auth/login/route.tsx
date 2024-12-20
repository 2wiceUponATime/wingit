import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '@/lib/db';
import { User } from '@/lib/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRATION = '1h';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const dbUser = db.get(["user", username]);

    if (!dbUser || typeof dbUser == "string") {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const user = dbUser as User;

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const payload = { id: user.id, username: user.username };

    const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
    );

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60,
    });
    return response;
}

export async function GET(req: Request) {
    return new NextResponse("This page cannot handle GET requests");
}