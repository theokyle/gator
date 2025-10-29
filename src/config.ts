import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string,
    currentUserName: string
}

export function setUser(userName: string) {
    const config = readConfig();
    config.currentUserName = userName;
    writeConfig(config)
}

export function readConfig() {
    const filepath = path.join(os.homedir(), ".gatorconfig.json")
    
    const data = fs.readFileSync(filepath, "utf-8")
    const rawConfig = JSON.parse(data);

    return validateConfig(rawConfig);
}

function writeConfig(cfg: Config) {
    const filepath = path.join(os.homedir(), ".gatorconfig.json")

    const rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    }

    const data = JSON.stringify(rawConfig, null, 2)
    fs.writeFileSync(filepath, data, {encoding: "utf-8"})
}

function validateConfig(rawConfig: any) {
    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("db_url is required in config file");
    }
    if (!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
        throw new Error("current_user_name is required in config file")
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    }

    return config;
}

