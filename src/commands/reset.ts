import { deleteUsers } from "src/lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]) {
    await deleteUsers()
    console.log("Users successfully reset")
    process.exit(0)
}