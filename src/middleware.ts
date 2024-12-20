import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: Request) {
    const url = new URL(request.url);
    if (request.method === 'GET') {
        let cookies: Record<string, string | undefined> = {};
        const cookie = request.headers.get("cookie");
        if (cookie) {
            cookies = parse(cookie);
        }
        const { token } = cookies;

        if (url.pathname == "/user/login") {
            url.pathname = "/user";
            url.hash = "";
            url.search = "";
            return token ?
                NextResponse.redirect(url) :
                NextResponse.next();
        }

        if (!token) {
            url.pathname = "/user/login";
            url.hash = "";
            url.search = "";
            return NextResponse.redirect(url);
        }

        const user = await verifyToken(token);
        if (user) {
            return NextResponse.next({
                request: {
                    headers: new Headers({
                        user: JSON.stringify(user),
                    })
                }
            });
        } else {
            return NextResponse.json("Invalid token");
        }
    } else {
        return NextResponse.json({ message: 'Method Not Allowed' });
    }
}

export const config = {
    matcher: "/user/:path*",
}
