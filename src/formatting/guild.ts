import type { Guild, GuildMember, Role } from "discord.js";
import type { FetchType } from "../lib/index";
import type { GuildBasedChannel } from "discord.js";
import type { GuildEmoji } from "discord.js";

export class GuildFormat {
    /**
     * Fetches the roles and returns all of them in a string, sorted from higher to lower position.
     * @param guild - The guild to fetch the roles from.
     * @param fetch_type - The type of how to fetch the roles.
     * @returns All the roles in the server, sorted and into a string.
     */
    public roles(guild: Guild, fetch_type: FetchType): string {
        return guild.roles.cache
            .sort((a: Role, b: Role) => b.position - a.position)
            .map((rl) => (fetch_type === "name"
                ? rl.name
                : `<@&${rl.id}>`))
            .join(", ");
    }

    /**
     * Fetches the members and returns all of them in a string, sorted from older to younger by joined date.
     * @param guild - The guild to fetch the members from.
     * @param fetch_type - The type of how to fetch the members.
     * @returns All the members in the server, sorted and into a string.
     */
    public async members(guild: Guild, fetch_type: FetchType): Promise<string> {
        const members = await guild.members.list({ cache: true });

        return members
            .sort((a: GuildMember, b: GuildMember) => b.joinedTimestamp! - a.joinedTimestamp!)
            .map((mb) => (fetch_type === "name"
                ? `${mb.user.tag} (\`${mb.user.id}\`)`
                : `<@!${mb.user.id}>`))
            .join(", ");
    }

    /**
     * Fetches the channels and returns all of them in a string, sorted from older to younger by creation date.
     * @param guild - The guild to fetch the members from.
     * @param fetch_type - The type of how to fetch the channels.
     * @returns All the channels in the server, sorted into a string. 
     */
    public channels(guild: Guild, fetch_type: FetchType): string {
        return guild.channels.cache
            .sort((a: GuildBasedChannel, b: GuildBasedChannel) => b.createdTimestamp! - a.createdTimestamp!)
            .map((cn) => (fetch_type === "name"
                ? `\#​${cn.name} (\`${cn.id}\`)`
                : `<#${cn.id}>`))
            .join(", ");
    }

    /**
     * Fetches the emojis and returns all of them in a string, sorted from older to younger by creation date.
     * @param guild - The guild to fetch the emojis from.
     * @returns All the emojis in the server, sorted into a string.
     */
    public emojis(guild: Guild): string {
        return guild.emojis.cache
            .sort((a: GuildEmoji, b: GuildEmoji) => b.createdTimestamp! - a.createdTimestamp!)
            .map((ej) => `<:${ej.name}:${ej.id}> :​${ej.name}​: (\`${ej.id}\`)`)
            .join("\n");
    }
}