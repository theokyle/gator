import { UserCommandHandler, CommandHandler } from "./commands/command"
import { getUserByName } from "./lib/db/queries/users";
import { readConfig } from "./config";

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdName: string, ...args: string[]): Promise<void> => {
        const config = readConfig();
        const user = await getUserByName(config.currentUserName);
        if (!user) {
            throw new Error(`User ${config.currentUserName} not found`);
        }

        await handler(cmdName, user, ...args)
    }
}