import type { Guild, GuildMember, Role } from "discord.js";
import { Pager } from "../lib/index";

import type { GuildBasedChannel, GuildEmoji } from "discord.js";
import type { FetchType } from "../lib/index";

export class GuildFormat {
    /**
     * Fetches the roles and returns all of them in a string, sorted from higher to lower position.
     * @param guild - The guild to fetch the roles from.
     * @param fetch_type - The type of how to fetch the roles.
     * @returns All the roles in the server, sorted and into a string.
     */
    public roles(guild: Guild, fetch_type: FetchType, pager?: { enabled: boolean; page: number; }): string | { data: string[]; max: number; } {
        const roles = guild.roles.cache
            .sort((a: Role, b: Role) => b.position - a.position)
            .map((rl) => (fetch_type === "name"
                ? rl.name
                : `<@&${rl.id}>`));
        
        return !pager?.enabled
            ? roles.join(", ")
            : Pager<string>({ arr: roles, itemsPerPage: 8, page: pager.page });
    }

    /**
     * Fetches the members and returns all of them in a string, sorted from older to younger by joined date.
     * @param guild - The guild to fetch the members from.
     * @param fetch_type - The type of how to fetch the members.
     * @returns All the members in the server, sorted and into a string.
     */
    public async members(guild: Guild, fetch_type: FetchType, pager?: { enabled: boolean; page: number; }): Promise<string | { data: string[]; max: number; }> {
        const membs = await guild.members.list({ cache: true });
        const members = membs
            .sort((a: GuildMember, b: GuildMember) => b.joinedTimestamp! - a.joinedTimestamp!)
            .map((mb) => (fetch_type === "name"
                ? `${mb.user.tag} (\`${mb.user.id}\`)`
                : `<@!${mb.user.id}>`));
        
        return !pager?.enabled
            ? members.join(", ")
            : Pager<string>({ arr: members, itemsPerPage: 8, page: pager.page });
    }

    /**
     * Fetches the channels and returns all of them in a string, sorted from older to younger by creation date.
     * @param guild - The guild to fetch the members from.
     * @param fetch_type - The type of how to fetch the channels.
     * @returns All the channels in the server, sorted into a string. 
     */
    public channels(guild: Guild, fetch_type: FetchType, pager?: { enabled: boolean; page: number; }): string | { data: string[]; max: number; } {
        const channels = guild.channels.cache
            .sort((a: GuildBasedChannel, b: GuildBasedChannel) => b.createdTimestamp! - a.createdTimestamp!)
            .map((cn) => (fetch_type === "name"
                ? `\#​${cn.name} (\`${cn.id}\`)`
                : `<#${cn.id}>`));
        
        return !pager?.enabled
            ? channels.join("\n")
            : Pager<string>({ arr: channels, itemsPerPage: 8, page: pager.page });
    }

    /**
     * Fetches the emojis and returns all of them in a string, sorted from older to younger by creation date.
     * @param guild - The guild to fetch the emojis from.
     * @returns All the emojis in the server, sorted into a string.
     */
    public emojis(guild: Guild, pager?: { enabled: boolean; page: number; }): string | { data: string[]; max: number; } {
        const emojis = guild.emojis.cache
            .sort((a: GuildEmoji, b: GuildEmoji) => b.createdTimestamp! - a.createdTimestamp!)
            .map((ej) => `<:${ej.name}:${ej.id}> :​${ej.name}​: (\`${ej.id}\`)`);
        
        return !pager?.enabled
            ? emojis.join("\n")
            : Pager<string>({ arr: emojis, itemsPerPage: 8, page: pager.page });
    }
}