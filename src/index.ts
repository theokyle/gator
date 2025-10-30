import { readConfig, setUser } from "./config";
import { handlerLogin } from "./commands/login";
import { registerCommand, runCommand , CommandsRegistry} from "./commands/command";
import { handlerRegister } from "./commands/register";
import { handlerReset } from "./commands/reset";
import { handlerUsers } from "./commands/users";

async function main() {
    const cmds: CommandsRegistry = {};

    registerCommand(cmds, "login", handlerLogin)
    registerCommand(cmds, "register", handlerRegister)
    registerCommand(cmds, "reset", handlerReset)
    registerCommand(cmds, "users", handlerUsers)

    const args = process.argv.slice(2, process.argv.length)
    if (args.length === 0) {
        console.error("Please provide an argument");
        process.exit(1);
    }

    const cmdName = args[0];
    const cmdArgs = args.slice(1, args.length);

    await runCommand(cmds, cmdName, ...cmdArgs)
    process.exit(0)
}

main();