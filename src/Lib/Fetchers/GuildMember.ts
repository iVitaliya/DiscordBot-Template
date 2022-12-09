import { Guild } from "discord.js";


export class GuildMemberFetcher {
    private guild: Guild;

    public constructor(guild: Guild) {
        this.guild = guild;
    }

    public get(identifier: string) {
        const member = this.guild.members.cache
            .find(
                (m) => m.id === identifier ||
                    `<@!${m.id}>` === identifier ||
                    m.user.tag === identifier
            );

        return member || null;
    }
} 