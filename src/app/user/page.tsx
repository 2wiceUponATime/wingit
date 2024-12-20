import { getUser } from "@/lib/headers";

export default async function Protected() {
    let user = await getUser();
    console.log(user);
    user ||= {
        username: "",
        passwordHash: "",
        id: -1,
    }

    return (
        <main>
            <p>Hello, {user.username}! You are user #{user.id}.</p>
        </main>
    );
}