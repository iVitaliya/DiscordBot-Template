import { Guild } from "discord.js";


export class RoleFetcher {
    private guild: Guild;

    public constructor(guild: Guild) {
        this.guild = guild;
    }

    public get(identifier: string) {
        const role = this.guild.roles.cache
            .find(
                (r) => r.id === identifier ||
                    `<@&${r.id}>` === identifier ||
                    r.name === identifier
            );

        return role || null;
    }
} 