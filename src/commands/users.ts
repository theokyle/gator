import { readConfig } from "src/config";
import { getUsers } from "src/lib/db/queries/users"

export async function handlerUsers(cmdName: string, ...args: string[]) {
    const users = await getUsers();
    const currentUser = readConfig().currentUserName;

    users.forEach(user => {
        if (user.name == currentUser) {
            console.log(`* ${user.name} (current)`);
        } else {
            console.log(`* ${user.name}`);
        }
    })
}