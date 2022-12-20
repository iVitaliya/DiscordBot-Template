import { Collection, GuildMember, PermissionResolvable } from "discord.js";
import { readdirSync } from "fs";
import { join, resolve } from "path";

import { Command, DiscordClient } from "../index";


interface ICheckPermissions {
    /** The missing permissions */
    missing: string;
    /** If said user is missing permissions */
    missing_permissions: boolean;
}

export class Processor {
    private client: DiscordClient;

    public constructor(client: DiscordClient) {
        this.client = client;
    }

    public listeners(): void {
        const folder = readdirSync(resolve(join(__dirname, '..', '..', 'Listeners')));

        for (const sub_folder of folder) {
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
                } catch (_err) {
                    this.client.logger.error(`-- ❌ ${file}`);
                }
            }
            console.log('\n');
        }

        return map;
    }

    public static CheckPermissions(member: GuildMember, permissions: PermissionResolvable | PermissionResolvable[]): ICheckPermissions {
        if (!Array.isArray(permissions)) {
            const hasPerm = member.permissions.has(permissions);

            return {
                missing: !hasPerm ? permissions : "",
                missing_permissions: !hasPerm ? false : true
            } as ICheckPermissions;
        }

        let str = "";
        let opt = {} as ICheckPermissions;
        for (const element of permissions) {
            const hasPerm = member.permissions.has(element, true);

            !hasPerm ? str += `${element}, ` : str += "";
        }

        opt = {
            missing: str.slice(str.length - 1, str.length),
            missing_permissions: str.length > 1
        };

        return opt;
    }
}
