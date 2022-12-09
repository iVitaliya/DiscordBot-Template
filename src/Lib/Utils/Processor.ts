import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { resolve, join } from "path";

import { DiscordClient, Command } from "../index";


export class Processor {
    private client: DiscordClient;

    public constructor(client: DiscordClient) {
        this.client = client;
    }

    public listeners(): void {
        const folder = readdirSync(resolve(join(__dirname, '..', '..', 'Listeners')));

        for (let sub_folder of folder) {
            const files: string[] = readdirSync(resolve(join(__dirname, "..", "..", "Listeners", sub_folder))).filter((f: string) => f.endsWith(".js"));

            for (const file of files) {
                try {
                    let evt = require(`../../Listeners/${sub_folder}/${file}`);
                    evt = new evt(this);

                    this.client[evt.once ? "once" : "on"](evt.name, (...args) => evt.exec(args));
                } catch (err) {
                    this.client.logger.error(`Error on running listener: ${err}`);
                }
            }
        }
    }

    public commands(): Collection<string, Command> {
        const map: Collection<string, Command> = new Collection();
        console.log('\n');

        const folder = readdirSync(resolve(join(__dirname, '..', '..', 'Commands')));

        for (const sub_folder of folder) {
            this.client.logger.info(`${sub_folder}:`);

            const files: string[] = readdirSync(resolve(join(__dirname, '..', '..', 'Commands', sub_folder))).filter((f: string) => f.endsWith(".js"));

            for (const file of files) {
                try {
                    let cmd = require(`../../Commands/${sub_folder}/${file}`);
                    cmd = new cmd(this);

                    map.set(cmd.name, cmd);

                    this.client.logger.info(`-- ✅ ${file}`)
                } catch (err) {
                    this.client.logger.error(`-- ❌ ${file}`);
                }
            }
            console.log('\n');
        }

        return map;
    }
}