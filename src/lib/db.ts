import bcrypt from "bcryptjs";

let data = new Map<string, object>();

const db = {
    get(key: string[]) {
        return data.get(key.join("/"));
    },
    set(key: string[], value: object) {
        return data.set(key.join("/"), value);
    },
    keys() {
        return data.keys().map(key => key.split("/"));
    },
};

db.set(["user", "Hello"], {
    username: "Hello",
    id: 0,
    passwordHash: await bcrypt.hash("World", 10),
})

export default db;