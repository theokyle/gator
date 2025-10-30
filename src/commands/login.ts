import { setUser } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("login expects a username argument")
    }

    const userName = args[0];

    const dbUser = await getUserByName(userName);
    if (dbUser.length === 0) {
        throw new Error("user does not exist")
    }

    setUser(userName);
    console.log(`Username set to: ${userName}`);
}