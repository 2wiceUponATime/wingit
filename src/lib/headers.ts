import { headers } from "next/headers";
import { User } from "./types";

export async function getUrl(pathname: string) {
    const headerList = await headers();
    const hostname = headerList.get("x-forwarded-host");
    const port = headerList.get("x-forwarded-port");
    if (!(hostname && port)) {
        throw new Error();
    }
    const url = new URL(`${hostname}:${port}`);
    url.pathname = pathname;
    return url;
}

export async function getUser() {
    const headerList = await headers();
    const userHeader = headerList.get("user");
    if (!userHeader) {
        return;
    }
    return JSON.parse(userHeader) as User;
}