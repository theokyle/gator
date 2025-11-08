import { createUser, getUserByName } from "src/lib/db/queries/users";
import { setUser } from "src/config";

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("register command requires a name argument")
    }

    const userName = args[0];
    const dbUser = await getUserByName(userName);
    
    if (dbUser) {
        throw new Error("user already exists")
    }

    const user = await createUser(userName);
    setUser(userName)
    console.log(`User successfully registered: `, user);
}