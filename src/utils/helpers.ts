import {
    ChannelType, Guild, User,
    GuildMember, TextChannel,
} from "discord.js";
import moment from "moment";
import {
    FooterText, MessageEmbed,
    BotName
} from "../lib/index";

import type { PermissionResolvable } from "discord.js";
import type { Command } from "@sapphire/framework";
import type {
    UserType, OwnerType,
    DestinationType, IPager
} from "../lib/index";


export const Time = (to_format?: number) => typeof to_format === "number"
    ? moment(to_format).format("MMMM [the] Do, YYYY [@] h:mm:ss A")
    : moment().format("MMMM [the] Do, YYYY [@] h:mm:ss A");

export function formatPerm(perm: string) {
    return perm
        .toLowerCase()
        .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
        .replace(/_/g, " ")
        .replace(/Guild/g, "Server")
        .replace(/Use Vad/g, "Use Voice Acitvity");
}

export function Pager<T>(data: IPager<T>) {
    if (!data.page) {
        data.page = 1;
    }

    const maxPages = Math.ceil(data.arr.length / data.itemsPerPage);

    // if (data.page < 1 || data.page > maxPages) return null;
    if (data.page < 1) data.page = 1;
    if (data.page > maxPages) data.page = maxPages;

    return {
        data: data.arr.slice((data.page - 1) * data.itemsPerPage, data.page * data.itemsPerPage) as T[],
        max: maxPages
    };
}

function checkPermissions(permissions: PermissionResolvable[], channel: TextChannel, member: GuildMember) {
    const p = permissions.sort();
    const perms = channel.permissionsFor(member, true);

    for (const perm of p) {
        if (perms.has(perm, true)) {
            p.splice(p.indexOf(perm));
        }
    }

    return p;
}

export function sendCheckedPermissions(
    interaction: Command.ChatInputCommandInteraction,
    perms: PermissionResolvable[],
    dest_type: DestinationType,
    user_type: UserType
) {
    const { channel } = interaction;
    const member = interaction.member as GuildMember;
    const permissions = checkPermissions(perms, channel as TextChannel, member);

    if (!permissions.length || permissions.length < 1) {
        let str: string = "";

        // permissions.forEach((x, i) => {
        //     const lastIndex = permissions.length - 1;
        //     if (i === lastIndex) {
        //         str = str + formatPerms(x as string);
        //     } else {
        //         str = str + formatPerms(x as string) + ", ";
        //     }
        // });
        for (let i = 0; i < permissions.length; i++) {
            const item = permissions[i];
            const lastIndex = permissions.length - 1;

            if (i === lastIndex) {
                str = str + formatPerm(item as string);
            } else {
                str = str + formatPerm(item as string) + ", ";
            }
        }

        if (channel!.type !== ChannelType.GuildText) return;

        interaction.reply({
            embeds: [
                new MessageEmbed("Failed")
                    .setAuthor({ name: "An Error Occurred" })
                    .setDescription("You don't have the required permissions for this command, please make sure you have the permissions listed below, if this seems like an false error then please report this using `/report`.")
                    .addField({
                        name: "Required Permissions",
                        value: str,
                        inline: true
                    })
                    .addField({
                        name: `Occurrence`,
                        value: [
                            `**On** ${dest_type === "role" ? "Role" : "Channel"}`,
                            `**For** ${user_type === "client" ? "Bot (Me)" : "Author (You)"}`
                        ].join("\n"),
                        inline: true
                    })
                    .setFooter({ text: `${BotName} Errors | ${FooterText}` })
                    .build
            ],
            ephemeral: true
        });

        return true;
    } else return false;
}

export function checkID(interaction: Command.ChatInputCommandInteraction, data: {
    user: string;
    supposed_user: string;
    type: OwnerType;
    setting: boolean;
}) {
    if (data.setting) return false;
    if (data.user !== data.supposed_user) {
        interaction.reply({
            embeds: [
                new MessageEmbed("Failed")
                    .setAuthor({ name: "An Error Occurred" })
                    .setDescription(`You can't execute this command as it's an \`${data.type === "owner"
                        ? "Server Owner"
                        : "Bot Developer"
                        }\` **ONLY** command, if this seems like an false error then please report this using \`/report\`.`)
                    .setFooter({ text: `${BotName} Errors | ${FooterText}` })
                    .build
            ],
            ephemeral: true
        });

        return true;
    }

    return false;
}

export async function guildMe(guild: Guild) {
    return await guild.members.fetchMe({
        cache: false,
        force: true
    });
}

export function toProperCase(str: string) {
    let s = str.split('_');

    s = s.map(i => i.charAt(0).toUpperCase() + i.substring(1));
    return s.join(' ');
}

export function identifyGuildID(guild: string | Guild) {
    return typeof guild === 'string'
        ? guild
        : guild.id;
}

export function identifyUserID(user: string | GuildMember | User) {
    return typeof user === 'string'
        ? user
        : (
            user instanceof GuildMember
                ? user.user.id
                : user.id
        );
}

export function userInGuild(guild: Guild, user: User) {
    const u = guild.client.users.cache.find(
        (x) => x.username.toLowerCase() === user.username.toLowerCase() ||
            x.tag.toLowerCase() === user.tag.toLowerCase() ||
            x.id === `<@!${user.id}>`.replace(/[\\<>@!]/g, '')
    );

    if (!(u instanceof User)) return false;
    else return true;
}

export function fetchMessageLink(guildID: string, channelID: string, messageID: string) {
    return `https://discord.com/channels/${guildID}/${channelID}/${messageID}`;
}