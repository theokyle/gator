import { User } from "src/lib/db/schema";
import { handlerLogin } from "./login";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type UserCommandHandler = (cmdName: string, user: User, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName:string, ...args: string[]) {
    if(!registry[cmdName]) {
        throw new Error("invalid command")
    }

    await registry[cmdName](cmdName, ...args)
}