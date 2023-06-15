import moment from "moment";
import { GuildMember } from "discord.js";
import { Database, Reasons, identifyGuildID, identifyUserID } from "../lib/index";
import type { Guild } from "discord.js";
import type { IAFK } from "../lib/index";

/**
 * Fetches all the AFK'd users from the guild.
 * @param guild - The guild to fetch all AFK'd members from. (accepts: Guild object, guild ID)
 * @returns An array including the information of the AFK'd users.
 */
export async function getAFK(guild: string | Guild) {
    const guildID = identifyGuildID(guild);
    const arr = await Database.get<IAFK[]>(`${guildID}.afk`);

    return arr;
}

/**
 * Checks if a certain user is found in the AFK list.
 * @param guild - The guild to check the member's AFK status for. (accepts: Guild object, Guild ID)
 * @param member - The member to check the AFK status for. (accepts: User object, GuildMember object, user/member ID)
 * @returns A boolean, defining if the user is AFK or not.
 */
export async function isAFK(guild: string | Guild, member: GuildMember) {
    const guildID = identifyGuildID(guild);
    const userID = identifyUserID(member);


    const inArr = (await getAFK(guildID)).find((x) => x.userID === userID);
    const ifNick = member.displayName.startsWith("[AFK] ");
    const nickIsUser = member.displayName.replace("[AFK] ", "") === member.user.username;

    if (!inArr && ifNick) {
        member.setNickname(nickIsUser
            ? null
            : member.displayName.replace("[AFK] ", ""),
            Reasons.nickname_reset({
                username: member.user.username,
                id: member.user.id
            }, "Isn't AFK anymore")
        );
        return false;
    }

    if (inArr && !ifNick) {
        member.setNickname(`[AFK] ${member.displayName}`, Reasons.afk_started(
            {
                username: member.user.username,
                id: member.user.id
            }
        ));
        return true;
    }

    if (!inArr && !ifNick) return false;
    return true;
}

export async function setAFK(
    guild: string | Guild,
    member: GuildMember,
    reason: string,
    option: "add" | "remove"
) {
    const guildID = identifyGuildID(guild);
    const available = (await Database.get<IAFK>(`${guildID}.afk`));

    if (option === "add") {
        if (!available) return;

        await Database.push(`${guildID}.afk`, {
            reason: reason,
            userID: member.user.id,
            startedAt: moment(Date.now()).format("LTS")
        } as IAFK, true);

        member.setNickname(`[AFK] ${member.displayName}`);
        return;
    }

    if (option === "remove") {
        if (!available) return;

        await Database.pull(`${guildID}.afk`, {
            reason: reason,
            userID: member.user.id,
            startedAt: moment(Date.now()).format("LTS")
        } as IAFK);
        const nick = member.displayName.replace("[AFK] ", "") === member.user.username
            ? null
            : member.displayName.replace("[AFK] ", "");

        member.setNickname(nick, Reasons.afk_ended({
            username: member.user.username,
            id: member.id
        }, "Returned to Discord", available.startedAt as string));
        return;
    }
}

export async function getEqual<T>(key: string, supposed_value: T) {
    const g = await Database.get(key) as T;
    if (g !== supposed_value) {
        await Database.set(key, supposed_value);

        return await Database.get(key);
    }

    return g;
}

export async function defaultIfUnavailable(key: string, value: any) {
    const g = await Database.get(key);
    if (typeof g !== typeof value) {
        await Database.set(key, value);

        return await Database.get(key);
    }
    else return g;
}

export async function dataInObject<T extends object>(obj_key: string, key: string) {
    const d = await Database.get(obj_key) as T;

    if (key in d) return true;
    else return false;
}