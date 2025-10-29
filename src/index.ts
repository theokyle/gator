import { readConfig, setUser } from "./config";

function main() {
    setUser("Kyle")
    const cfg = readConfig();
    console.log(cfg)
}

main();