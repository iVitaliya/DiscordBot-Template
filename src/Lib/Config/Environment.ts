import { config } from "dotenv";
import { resolve } from "path";

export const Config = {
    init: () => config({ path: resolve(process.cwd(), "Configurations", ".env") }),
    get: (key: string) => {
        const k = key === key.toLowerCase() ? key.toUpperCase() : key;

        return process.env[k];
    }
};